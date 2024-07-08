'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { toast } from '@payloadcms/ui'

import { User } from '@payload-types'

// eslint-disable-next-line no-unused-vars
type ResetPassword = (args: {
  password: string
  passwordConfirm: string
  token: string
}) => Promise<void>

type ForgotPassword = (args: { email: string }) => Promise<void> // eslint-disable-line no-unused-vars

type Create = (args: {
  email: string
  password: string
  passwordConfirm: string
  role: 'candidate' | 'organization'
  title?: string
  firstName?: string
  lastName?: string
}) => Promise<void> // eslint-disable-line no-unused-vars

type Login = (args: { email: string; password: string }) => Promise<User> // eslint-disable-line no-unused-vars

type Logout = () => Promise<void>

type AuthContext = {
  user?: User | null
  loading?: boolean
  setUser: (user: User | null) => void // eslint-disable-line no-unused-vars
  logout: Logout
  login: Login
  create: Create
  resetPassword: ResetPassword
  forgotPassword: ForgotPassword
  status: undefined | 'loggedOut' | 'loggedIn'
}

const Context = createContext({} as AuthContext)

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>()

  // used to track the single event of logging in or logging out
  // useful for `useEffect` hooks that should only run once
  const [status, setStatus] = useState<undefined | 'loggedOut' | 'loggedIn'>()

  // used to track the loading state of the auth provider
  const [loading, setLoading] = useState<boolean>(false)

  // const fetchCandidateProfile = async (user: User) => {
  //   if (user.role === 'candidate' && user.profile?.relationTo === 'candidates') {
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_SERVER_URL}/api/candidates/${
  //           typeof user.profile.value === 'string' ? user.profile.value : user.profile.value.id
  //         }`,
  //         {
  //           method: 'GET',
  //           credentials: 'include',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         },
  //       )

  //       if (res.ok) {
  //         const profile = await res.json()

  //         return {
  //           ...user,
  //           profile: {
  //             ...user.profile,
  //             value: profile,
  //           },
  //         }
  //       }
  //     } catch (e) {
  //       console.error('An error occurred while fetching the candidate profile.', e)
  //     }
  //   }

  //   return user
  // }

  const create = useCallback<Create>(async args => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: args.email,
          password: args.password,
          passwordConfirm: args.passwordConfirm,
          title: args.title,
          firstName: args.firstName,
          lastName: args.lastName,
          role: args.role,
        }),
      })

      if (res.ok) {
        const responseData = await res.json()
        toast.success(responseData.message)

        if (responseData.errors) {
          toast.error(responseData.errors[0].message)
          throw new Error(responseData.errors[0].message)
        }

        // const userWithProfile = await fetchCandidateProfile(responseData.doc.user)
        setUser(responseData.doc.user)
        setStatus('loggedIn')
      } else {
        throw new Error('Invalid response from the server')
      }
    } catch (e) {
      throw new Error('An error occurred while attempting to register.')
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback<Login>(async args => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: args.email,
          password: args.password,
        }),
      })

      if (res.ok) {
        const { user, errors } = await res.json()
        if (errors) throw new Error(errors[0].message)
        // const userWithProfile = await fetchCandidateProfile(user)
        setUser(user)
        setStatus('loggedIn')
        return user
      }

      throw new Error('Invalid login')
    } catch (e) {
      throw new Error('An error occurred while attempting to login.')
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback<Logout>(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })

      if (res.ok) {
        setUser(null)
        setStatus('loggedOut')
      } else {
        throw new Error('An error occurred while attempting to logout.')
      }
    } catch (e) {
      throw new Error('An error occurred while attempting to logout.')
    }
  }, [])

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setLoading(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (res.ok) {
          const { user: meUser } = await res.json()
          setUser(meUser || null)
          setStatus(meUser ? 'loggedIn' : undefined)
        } else {
          throw new Error('An error occurred while fetching your account.')
        }
      } catch (e) {
        setUser(null)
        throw new Error('An error occurred while fetching your account.')
      } finally {
        setLoading(false)
      }
    }

    fetchMe()
  }, [])

  const forgotPassword = useCallback<ForgotPassword>(async args => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: args.email,
        }),
      })

      if (res.ok) {
        const { data, errors } = await res.json()
        if (errors) throw new Error(errors[0].message)
        // const userWithProfile = await fetchCandidateProfile(data?.loginUser?.user)
        setUser(data?.loginUser?.user)
      } else {
        throw new Error('Invalid login')
      }
    } catch (e) {
      throw new Error('An error occurred while attempting to reset password.')
    }
  }, [])

  const resetPassword = useCallback<ResetPassword>(async args => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: args.password,
          passwordConfirm: args.passwordConfirm,
          token: args.token,
        }),
      })

      if (res.ok) {
        const { data, errors } = await res.json()
        if (errors) throw new Error(errors[0].message)
        // const userWithProfile = await fetchCandidateProfile(data?.loginUser?.user)
        setUser(data?.loginUser?.user)
        setStatus(data?.loginUser?.user ? 'loggedIn' : undefined)
      } else {
        throw new Error('Invalid login')
      }
    } catch (e) {
      throw new Error('An error occurred while attempting to reset password.')
    }
  }, [])

  return (
    <Context.Provider
      value={{
        user,
        loading,
        setUser,
        login,
        logout,
        create,
        resetPassword,
        forgotPassword,
        status,
      }}
    >
      {children}
    </Context.Provider>
  )
}

type UseAuth<T = User> = () => AuthContext

const useAuth: UseAuth = () => useContext(Context)

export { useAuth, AuthProvider }

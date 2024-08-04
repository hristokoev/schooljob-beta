'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { toast } from '@payloadcms/ui'
import { User } from '@payload-types'
import { useTranslations } from 'next-intl'

type ResetPassword = (args: {
  password: string
  passwordConfirm: string
  token: string
}) => Promise<void>

type ForgotPassword = (args: { email: string }) => Promise<void>

type Create = (args: {
  email: string
  password: string
  passwordConfirm: string
  role: 'candidate' | 'organization'
  title?: string
  firstName?: string
  lastName?: string
}) => Promise<void>

type Login = (args: { email: string; password: string }) => Promise<User>

type Logout = () => Promise<void>

type AuthContext = {
  user?: User | null
  loading?: boolean
  setUser: (user: User | null) => void
  logout: Logout
  login: Login
  create: Create
  resetPassword: ResetPassword
  forgotPassword: ForgotPassword
  status: undefined | 'loggedOut' | 'loggedIn'
}

const Context = createContext({} as AuthContext)

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = useTranslations()
  const [user, setUser] = useState<User | null>()

  // used to track the single event of logging in or logging out
  // useful for `useEffect` hooks that should only run once
  const [status, setStatus] = useState<undefined | 'loggedOut' | 'loggedIn'>()

  // used to track the loading state of the auth provider
  const [loading, setLoading] = useState<boolean>(false)

  const create = useCallback<Create>(
    async args => {
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
          throw new Error(t('authentication.errors.invalidRegister'))
        }
      } catch {
        throw new Error(t('authentication.errors.register'))
      } finally {
        setLoading(false)
      }
    },
    [t],
  )

  const login = useCallback<Login>(
    async args => {
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

        throw new Error(t('authentication.errors.invalidLogin'))
      } catch {
        throw new Error(t('authentication.errors.login'))
      } finally {
        setLoading(false)
      }
    },
    [t],
  )

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
        throw new Error(t('authentication.errors.invalidLogout'))
      }
    } catch {
      throw new Error(t('authentication.errors.logout'))
    }
  }, [t])

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
          throw new Error(t('authentication.errors.fetch'))
        }
      } catch {
        setUser(null)
        throw new Error(t('authentication.errors.fetch'))
      } finally {
        setLoading(false)
      }
    }

    fetchMe()
  }, [t])

  const forgotPassword = useCallback<ForgotPassword>(
    async args => {
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
          throw new Error(t('authentication.errors.login'))
        }
      } catch {
        throw new Error(t('authentication.errors.resetPassword'))
      }
    },
    [t],
  )

  const resetPassword = useCallback<ResetPassword>(
    async args => {
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
          throw new Error(t('authentication.errors.login'))
        }
      } catch {
        throw new Error(t('authentication.errors.resetPassword'))
      }
    },
    [t],
  )

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseAuth<T = User> = () => AuthContext

const useAuth: UseAuth = () => useContext(Context)

export { useAuth, AuthProvider }

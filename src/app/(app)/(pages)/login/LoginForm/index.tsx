'use client'

import React, { useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, FormInputField, Label, LoadingIcon } from '@/components'
import { LoginFormData, LoginFieldSchema } from '@/types'
import { useAuth } from '@/providers'

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const redirect = useRef(searchParams.get('redirect'))
  const { loading, login } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFieldSchema),
  })

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        await login(data)
        if (redirect?.current) router.push(redirect.current as string)
        else router.push('/account')
      } catch (e) {
        toast.error('Invalid email or password')
      } finally {
        reset()
      }
    },
    [login, router, reset],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-4">
      <div>
        <Label>
          Email <span className="text-red-500">*</span>
        </Label>
        <FormInputField
          type="email"
          placeholder="Email"
          name="email"
          register={register}
          error={errors.email}
        />
      </div>
      <div>
        <Label>
          Password <span className="text-red-500">*</span>
        </Label>
        <FormInputField
          type="password"
          placeholder="Password"
          name="password"
          register={register}
          error={errors.password}
        />
      </div>
      <Button type="submit" disabled={loading}>
        Log In
        {loading && <LoadingIcon className="ml-2 size-4" />}
      </Button>
    </form>
  )
}

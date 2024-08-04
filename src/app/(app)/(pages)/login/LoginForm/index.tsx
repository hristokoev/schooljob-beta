'use client'

import React, { useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, FormInputField, Label, LoadingIcon } from '@/components'
import { LoginFormData, useLoginFieldSchema } from '@/types'
import { useAuth } from '@/providers'

export const LoginForm = () => {
  const t = useTranslations()
  const LoginFieldSchema = useLoginFieldSchema()
  const searchParams = useSearchParams()
  const redirect = useRef(searchParams.get('redirect'))
  const { loading, login } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFieldSchema),
  })

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        await login(data)
        if (redirect?.current) router.push(redirect.current as string)
        else router.push('/account')
      } catch {
        toast.error(t('authentication.errors.invalidEmailOrPassword'))
      } finally {
        reset()
      }
    },
    [login, router, reset, t],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-4">
      <div>
        <Label>
          {t('login.email')} <span className="text-red-500">*</span>
        </Label>
        <FormInputField
          type="email"
          placeholder={t('login.emailPlaceholder')}
          name="email"
          register={register}
          error={errors.email}
        />
      </div>
      <div>
        <Label>
          {t('login.password')} <span className="text-red-500">*</span>
        </Label>
        <FormInputField
          type="password"
          placeholder={t('login.passwordPlaceholder')}
          name="password"
          register={register}
          error={errors.password}
        />
      </div>
      <Button type="submit" disabled={loading}>
        {t('login.button')}
        {loading && <LoadingIcon className="ml-2 size-4" />}
      </Button>
    </form>
  )
}

// TODO: Fix errors typing

'use client'

import { Controller, useForm } from 'react-hook-form'
import React, { Fragment, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Checkbox, FormInputField, Label, LoadingIcon } from '@/components'
import { RegisterFormData, useRegisterFieldSchema } from '@/types'
import { useAuth } from '@/providers'

const RegisterForm: React.FC = () => {
  const t = useTranslations()
  const RegisterFieldSchema = useRegisterFieldSchema()
  const searchParams = useSearchParams()
  const redirect = useRef(searchParams.get('redirect'))
  const { loading, create } = useAuth()
  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFieldSchema),
    defaultValues: {
      role: 'organization',
      processingOfPersonalData: false,
      terms: false,
    },
  })

  const onSubmit = useCallback(
    async (data: RegisterFormData) => {
      try {
        await create(data)
        if (redirect?.current) router.push(redirect.current as string)
        else router.push(`/login?success=${encodeURIComponent(t('register.success'))}`)
      } catch {
        toast.error(t('register.error'))
      }
    },
    [create, router, t],
  )

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <Label>
              {t('register.email')} <span className="text-red-500">*</span>
            </Label>
            <FormInputField
              type="email"
              placeholder={t('register.emailPlaceholder')}
              name="email"
              register={register}
              error={errors.email}
            />
          </div>
          <div>
            <Label>
              {t('register.password')} <span className="text-red-500">*</span>
            </Label>
            <FormInputField
              type="password"
              placeholder={t('register.passwordPlaceholder')}
              name="password"
              register={register}
              error={errors.password}
            />
          </div>
          <div>
            <Label>
              {t('register.confirmPassword')} <span className="text-red-500">*</span>
            </Label>
            <FormInputField
              type="password"
              placeholder={t('register.confirmPasswordPlaceholder')}
              name="passwordConfirm"
              register={register}
              error={errors.passwordConfirm}
            />
          </div>
          <div className="space-y-4">
            <div>
              <Label>
                {t('register.title')} <span className="text-red-500">*</span>
              </Label>
              <FormInputField
                type="text"
                placeholder={t('register.titlePlaceholder')}
                name="title"
                register={register}
                error={errors.title}
              />
            </div>
            <div>
              <Label>
                {t('register.vatId')} <span className="text-red-500">*</span>
              </Label>
              <FormInputField
                type="text"
                placeholder={t('register.vatIdPlaceholder')}
                name="vatId"
                register={register}
                error={errors.vatId}
              />
            </div>
            <div>
              <Controller
                name="processingOfPersonalData"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    label={t.rich('register.consents.processingOfPersonalData', {
                      Link: chunks => (
                        <Link
                          href="/documents/personal-data"
                          className="text-royal-blue-500 transition duration-150 ease-in-out hover:text-royal-blue-600"
                        >
                          {chunks}
                        </Link>
                      ),
                    })}
                    required
                  />
                )}
              />
              {errors.processingOfPersonalData && (
                <span className="text-sm text-red-500">
                  {errors.processingOfPersonalData.message}
                </span>
              )}
            </div>
            <div>
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    label={t.rich('register.consents.terms', {
                      Link: chunks => (
                        <Link
                          href="/documents/terms-of-service"
                          className="text-royal-blue-500 transition duration-150 ease-in-out hover:text-royal-blue-600"
                        >
                          {chunks}
                        </Link>
                      ),
                    })}
                    required
                  />
                )}
              />
              {errors.terms && <span className="text-sm text-red-500">{errors.terms.message}</span>}
            </div>
          </div>
          <div className="hidden">
            <Label>
              {t('register.role')} <span className="text-red-500">*</span>
            </Label>
            <FormInputField
              type="text"
              placeholder=""
              name="role"
              register={register}
              error={errors.role}
              disabled
              className="hidden"
            />
          </div>
        </div>
        <Button type="submit" disabled={loading} className="mt-6 w-full">
          {t('register.button')}
          {loading && <LoadingIcon className="ml-2 size-4" />}
        </Button>
      </form>
    </Fragment>
  )
}

export default RegisterForm

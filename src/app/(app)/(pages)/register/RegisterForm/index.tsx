'use client'

import { Controller, FieldError, FieldErrors, useForm } from 'react-hook-form'
import React, { Fragment, useCallback, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import StarIcon from '@heroicons/react/24/solid/StarIcon'
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
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFieldSchema),
    defaultValues: {
      role: 'candidate',
      processingOfPersonalData: false,
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

  const role = watch('role')

  useEffect(() => {
    if (role === 'candidate') {
      setValue('processingOfPersonalData', false)
    } else if (role === 'organization') {
      setValue('processingOfPersonalData', false)
      setValue('terms', false)
    }
  }, [role, setValue])

  const [tab, setTab] = React.useState<'candidate' | 'organization'>('candidate')

  // Helper function to safely access nested errors
  const getFieldError = (
    errors: FieldErrors<RegisterFormData>,
    field: string,
  ): FieldError | undefined => {
    return (errors as Record<string, FieldError | undefined>)[field]
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="m-auto mb-6 flex justify-center">
          <div className="relative flex w-full rounded bg-slate-100 p-1">
            <span className="pointer-events-none absolute inset-0 m-1" aria-hidden="true">
              <span
                className={`absolute inset-0 w-1/2 transform rounded bg-white shadow transition duration-150 ease-in-out ${tab === 'candidate' ? 'translate-x-0' : 'translate-x-full'}`}
              ></span>
            </span>
            <button
              className={`relative flex-1 p-1 text-sm font-medium transition duration-150 ease-in-out ${tab === 'candidate' ? 'text-royal-blue-500' : 'text-gray-500'}`}
              onClick={e => {
                e.preventDefault()
                setTab('candidate')
                setValue('role', 'candidate')
              }}
              type="button"
            >
              {t('register.candidate')}
            </button>
            <button
              className={`relative flex flex-1 items-center justify-center p-1 text-sm font-medium transition duration-150 ease-in-out ${tab === 'organization' ? 'text-royal-blue-500' : 'text-gray-500'}`}
              onClick={e => {
                e.preventDefault()
                setTab('organization')
                setValue('role', 'organization')
              }}
              type="button"
            >
              <StarIcon className="mr-1 h-4 w-4 text-royal-blue-500" /> {t('register.organization')}
            </button>
          </div>
        </div>
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
          {tab === 'organization' && (
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
                  error={getFieldError(errors, 'title')}
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
                  error={getFieldError(errors, 'vatId')}
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
                {getFieldError(errors, 'terms') && (
                  <span className="text-sm text-red-500">
                    {getFieldError(errors, 'terms')?.message}
                  </span>
                )}
              </div>
            </div>
          )}
          {tab === 'candidate' && (
            <Fragment>
              <div>
                <Label>
                  {t('register.firstName')} <span className="text-red-500">*</span>
                </Label>
                <FormInputField
                  type="text"
                  placeholder={t('register.firstNamePlaceholder')}
                  name="firstName"
                  register={register}
                  error={getFieldError(errors, 'firstName')}
                />
              </div>
              <div>
                <Label>
                  {t('register.lastName')} <span className="text-red-500">*</span>
                </Label>
                <FormInputField
                  type="tex"
                  placeholder={t('register.lastNamePlaceholder')}
                  name="lastName"
                  register={register}
                  error={getFieldError(errors, 'lastName')}
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
            </Fragment>
          )}
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
          {tab === 'candidate'
            ? t('register.registerCandidate')
            : t('register.registerOrganization')}
          {loading && <LoadingIcon className="ml-2 size-4" />}
        </Button>
      </form>
    </Fragment>
  )
}

export default RegisterForm

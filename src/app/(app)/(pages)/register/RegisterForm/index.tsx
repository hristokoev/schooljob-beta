'use client'

import React, { Fragment, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import StarIcon from '@heroicons/react/24/solid/StarIcon'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, FormInputField, Label, LoadingIcon } from '@/components'
import { RegisterFormData, RegisterFieldSchema } from '@/types'
import { useAuth } from '@/providers'

const RegisterForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { loading, create } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFieldSchema),
    defaultValues: {
      role: 'candidate',
    },
  })

  const onSubmit = useCallback(
    async (data: RegisterFormData) => {
      try {
        await create(data)
        if (redirect?.current) router.push(redirect.current as string)
        else
          router.push(`/login?success=${encodeURIComponent('Registration successful')}${allParams}`)
      } catch (e) {
        toast.error('Something went wrong. Please try again.')
      }
    },
    [create, router, allParams],
  )

  const [tab, setTab] = React.useState<'candidate' | 'organization'>('candidate')

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
            >
              Candidate
            </button>
            <button
              className={`relative flex flex-1 items-center justify-center p-1 text-sm font-medium transition duration-150 ease-in-out ${tab === 'organization' ? 'text-royal-blue-500' : 'text-gray-500'}`}
              onClick={e => {
                e.preventDefault()
                setTab('organization')
                setValue('role', 'organization')
              }}
            >
              <StarIcon className="mr-1 h-4 w-4 text-royal-blue-500" /> Organization
            </button>
          </div>
        </div>
        <div className="space-y-4">
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
              placeholder="Enter a password"
              name="password"
              register={register}
              error={errors.password}
            />
          </div>
          <div>
            <Label>
              Repeat Password <span className="text-red-500">*</span>
            </Label>
            <FormInputField
              type="password"
              placeholder="Repeat password"
              name="passwordConfirm"
              register={register}
              error={errors.passwordConfirm}
            />
          </div>
          {tab === 'organization' && (
            <div>
              <Label>
                Title <span className="text-red-500">*</span>
              </Label>
              <FormInputField
                type="text"
                placeholder="Title of your organization"
                name="title"
                register={register}
                error={errors.title}
              />
            </div>
          )}
          {tab === 'candidate' && (
            <Fragment>
              <div>
                <Label>
                  First Name <span className="text-red-500">*</span>
                </Label>
                <FormInputField
                  type="text"
                  placeholder="Your first name"
                  name="firstName"
                  register={register}
                  error={errors.firstName}
                />
              </div>
              <div>
                <Label>
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <FormInputField
                  type="tex"
                  placeholder="Your last name"
                  name="lastName"
                  register={register}
                  error={errors.lastName}
                />
              </div>
            </Fragment>
          )}
          <div className="hidden">
            <Label>
              Role <span className="text-red-500">*</span>
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
          Register as {tab === 'candidate' ? 'Candidate' : 'Organization'}
          {loading && <LoadingIcon className="ml-2 size-4" />}
        </Button>
      </form>
    </Fragment>
  )
}

export default RegisterForm

'use client'

import { Controller, useForm } from 'react-hook-form'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Candidate } from '@payload-types'
import Link from 'next/link'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { zodResolver } from '@hookform/resolvers/zod'

import { ApplicationFormData, useApplicationFieldSchema } from '@/types'
import { Button, Checkbox, FormInputField, InputFile, Label, Textarea } from '@/components'
import { createApplication, uploadCv } from '@/actions'
import { useAuth } from '@/providers'

interface ApplyFormProps {
  jobId: string
  organizationId: string
}

const ApplyForm = ({ jobId, organizationId }: ApplyFormProps) => {
  const t = useTranslations()
  const ApplicationFieldSchema = useApplicationFieldSchema()
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    control,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(ApplicationFieldSchema),
  })

  const onSubmit = useCallback(
    async (data: ApplicationFormData) => {
      const uploadPromise = uploadCv(data.cv, data.job, data.organization, user)

      toast.promise(
        uploadPromise.then(async cvDoc => {
          await createApplication(
            {
              ...data,
              cv: cvDoc?.id,
            },
            user,
          )
        }),
        {
          loading: t('applyForm.loading'),
          success: t('applyForm.success'),
          error: error => error.message,
          finally: () => {
            setIsOpen(false)
            reset()
          },
        },
      )
    },
    [user, t],
  )

  useEffect(() => {
    const profile = (user?.profile?.value as Candidate) || {}
    reset({
      status: 'pending',
      job: jobId,
      organization: organizationId,
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      email: profile.email || '',
      location: profile.location || '',
      phone: profile.phone || '',
      processingOfPersonalData: false,
    })
  }, [jobId, organizationId, user, reset])

  return (
    <Fragment>
      {(!user || user.role === 'candidate') && (
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Button type="button" onClick={() => setIsOpen(true)}>
              {t('applyForm.button')}
            </Button>
          </div>
        </div>
      )}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-40" transition>
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <DialogPanel className="max-h-[85dvh] overflow-y-auto rounded-md bg-white p-6 md:min-w-[768px]">
            <DialogTitle className="font-bold">
              <div className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-4 py-6">
                <div className="flex w-full items-center justify-between">
                  <p className="grow text-center">{t('applyForm.header')}</p>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8"
                    onClick={() => setIsOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </DialogTitle>
            <form className="mt-4 grid w-full gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2 md:grid-cols-2">
                <div className="flex flex-col">
                  <Label className="text-md font-bold">
                    {t('applyForm.firstName')} <span className="text-red-500">*</span>
                  </Label>
                  <FormInputField
                    type="text"
                    name="firstName"
                    register={register}
                    error={errors.firstName}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <Label className="text-md font-bold">
                    {t('applyForm.lastName')} <span className="text-red-500">*</span>
                  </Label>
                  <FormInputField
                    type="text"
                    name="lastName"
                    register={register}
                    error={errors.lastName}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <div className="flex flex-col">
                  <Label className="text-md font-bold">
                    {t('applyForm.email')} <span className="text-red-500">*</span>
                  </Label>
                  <FormInputField
                    type="email"
                    name="email"
                    register={register}
                    error={errors.email}
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <Label className="text-md font-bold">
                    <span>{t('applyForm.phone')}</span>
                  </Label>
                  <FormInputField
                    type="phone"
                    name="phone"
                    register={register}
                    error={errors.phone}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <Label className="text-md font-bold">
                  <span>{t('applyForm.location')}</span>
                </Label>
                <FormInputField
                  type="text"
                  name="location"
                  register={register}
                  error={errors.location}
                  className="w-full"
                />
              </div>

              <div className="flex flex-col">
                <Label className="text-md font-bold">
                  <span>{t('applyForm.coverLetter')}</span>
                </Label>
                <Controller
                  name="coverLetter"
                  control={control}
                  render={({ field }) => (
                    <Textarea className="form-textarea w-full" {...field} rows={5} />
                  )}
                />
              </div>

              <div className="flex flex-col">
                <Label className="text-md font-bold">
                  {t('applyForm.cv')} <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="cv"
                  control={control}
                  render={({ field: { onChange, value, ...fieldProps } }) => (
                    <InputFile
                      {...fieldProps}
                      file={value}
                      error={errors.cv}
                      onChange={event => onChange(event.target.files && event.target.files[0])}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col">
                <Controller
                  name="processingOfPersonalData"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col">
                      <Checkbox
                        {...field}
                        label={t.rich('applyForm.consents.processingOfPersonalData', {
                          Link: chunks => (
                            <Link
                              href="/"
                              className="text-royal-blue-500 transition duration-150 ease-in-out hover:text-royal-blue-600"
                            >
                              {chunks}
                            </Link>
                          ),
                        })}
                        required
                      />
                    </div>
                  )}
                />
                {errors.processingOfPersonalData && (
                  <span className="text-sm text-red-500">
                    {errors.processingOfPersonalData.message}
                  </span>
                )}
              </div>

              <Button type="submit" className="h-12">
                {t('ui.submit')}
                {/* {loading && <LoadingIcon className="ml-2 size-4" />} */}
              </Button>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </Fragment>
  )
}

export { ApplyForm }

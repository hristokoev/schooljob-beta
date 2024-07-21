'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { Fragment, useCallback, useEffect, useState } from 'react'

import { Button, FormInputField, Input, InputFile, Label, Textarea } from '@/components'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Controller, useForm } from 'react-hook-form'
import { ApplicationFieldSchema, ApplicationFormData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Candidate, Cv } from '@payload-types'
import { useAuth } from '@/providers'
import { createApplication, uploadCv } from '@/actions'

interface ApplyFormProps {
  jobId: string
  organizationId: string
}

const ApplyForm = ({ jobId, organizationId }: ApplyFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
    control,
    setValue,
    watch,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(ApplicationFieldSchema),
  })

  const onSubmit = useCallback(
    async (data: ApplicationFormData) => {
      try {
        toast.promise(
          async () => {
            const cvDoc = await uploadCv(data.cv, data.job, data.organization, user)

            createApplication(
              {
                ...data,
                cv: cvDoc?.id,
              },
              user,
            )
          },
          {
            loading: 'Sending...',
            success: 'Application successfully sent',
            error: 'Error sending application',
          },
        )
      } catch (e) {
        console.error('Error in onSubmit:', e)
      }
    },
    [user],
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
    })
  }, [jobId, organizationId, user, reset])

  return (
    <Fragment>
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <Button type="button" onClick={() => setIsOpen(true)}>
            Apply Now
          </Button>
        </div>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50" transition>
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <DialogPanel className="max-h-[85dvh] overflow-y-auto rounded-md bg-white p-6 md:min-w-[768px]">
            <DialogTitle className="font-bold">
              <div className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-4 py-6">
                <div className="flex w-full items-center justify-between">
                  <p className="grow text-center">I&apos;m interested in this job</p>
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
                    Name <span className="text-red-500">*</span>
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
                    Surname <span className="text-red-500">*</span>
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
                    Email <span className="text-red-500">*</span>
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
                    <span>Phone</span>
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
                  <span>Location</span>
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
                  <span>Cover Letter</span>
                </Label>
                <Controller
                  name="coverLetter"
                  control={control}
                  render={({ field }) => (
                    <Textarea className="form-textarea w-full" {...field} rows={5} />
                  )}
                />
              </div>

              <Label className="text-md font-bold">
                Curriculum Vitae (CV) <span className="text-red-500">*</span>
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
              <Button type="submit" className="h-12">
                Submit
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

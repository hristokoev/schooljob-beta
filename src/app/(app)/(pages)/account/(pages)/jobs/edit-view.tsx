'use client'

import { Controller, useForm } from 'react-hook-form'
import React, { useCallback, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Article,
  Aside,
  Button,
  Checkbox,
  FormInputField,
  Gutter,
  InputList,
  Label,
  LexicalEditor,
  Message,
  Section,
  Select,
  Switch,
  Textarea,
} from '@/components'
import { JobFormData, JobFieldSchema } from '@/types'
import {
  categoriesOptions,
  currencyOptions,
  educationOptions,
  employmentTypeOptions,
  experienceOptions,
  languageOptions,
  locationTypeOptions,
  salaryTypeOptions,
} from '@/payload/data'
import Link from 'next/link'
import { convertValue } from '@/utilities/convertValue'
import { StarIcon } from '@heroicons/react/24/solid'
import { createOrUpdateJob } from '@/actions'

interface JobsEditViewProps {
  id?: string
}

const JobsEditView: React.FC<Partial<JobFormData> & JobsEditViewProps> = formData => {
  const { id } = formData

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    setValue,
    setError,
    control,
    watch,
  } = useForm<JobFormData>({
    resolver: zodResolver(JobFieldSchema),
    defaultValues: {
      status: 'unpublished',
      salary: {
        enabled: false,
        range: false,
      },
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [],
            },
          ],
          direction: 'ltr',
          format: 'left',
          indent: 0,
          version: 1,
        },
      },
      suitableFor: {
        students: false,
        disabledPeople: false,
        mothersOnMaternityLeave: false,
        retirees: false,
      },
    },
  })

  useEffect(() => {
    reset(formData)
  }, [reset, formData])

  const router = useRouter()

  const onSubmit = useCallback(
    async (data: JobFormData) => {
      try {
        await toast.promise(createOrUpdateJob(data, id), {
          loading: 'Submitting...',
          success: message => {
            router.push('/account/jobs')
            return `Job successfully ${id ? 'updated' : 'created'}`
          },
          error: message => `${message}`,
          richColors: true,
        })
      } catch (e) {
        toast.error('Error submitting job')
      }
    },
    [id, router],
  )

  const watchSalary = watch('salary.enabled')
  const watchRange = watch('salary.range')
  const status = getValues('status')
  const published = status === 'published' || false
  const title = watch('title')
  const categories = watch('categories')
  const employmentType = watch('employmentType')
  const canPublish =
    title &&
    categories &&
    categories.length > 0 &&
    employmentType &&
    employmentType.length > 0 &&
    !Object.keys(errors).length

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Gutter>
        <Article>
          <Section className="space-y-8">
            <div>
              <div className="mb-8 sm:flex sm:items-center sm:justify-between">
                <div className="mb-4 flex items-center gap-2 sm:mb-0">
                  <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">Job Details</h1>
                </div>
              </div>
              <div className="space-y-8 rounded-md border border-slate-200 bg-white p-6">
                {status && (
                  <Message
                    success={published}
                    warning={!published}
                    message={`${convertValue(status)}`}
                    className="w-full"
                  />
                )}
                <div>
                  <Label>
                    Title <span className="text-rose-500">*</span>
                  </Label>
                  <FormInputField
                    type="text"
                    placeholder="Title"
                    name="title"
                    register={register}
                    error={errors.title}
                    disabled={published}
                  />
                </div>

                <div className={published ? 'cursor-not-allowed' : ''}>
                  <Label>
                    Categories <span className="text-rose-500">*</span>
                  </Label>
                  <Controller
                    name="categories"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={categoriesOptions}
                        className={`w-full ${errors.categories ? 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25' : ''}`}
                        isDisabled={published}
                      />
                    )}
                  />
                  {errors.categories && (
                    <span className="text-sm text-red-500">{errors.categories.message}</span>
                  )}
                </div>

                <div className={published ? 'cursor-not-allowed' : ''}>
                  <Label>
                    Employment <span className="text-rose-500">*</span>
                  </Label>
                  <Controller
                    name="employmentType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={employmentTypeOptions}
                        className={`w-full ${errors.employmentType ? 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25' : ''}`}
                        isDisabled={published}
                      />
                    )}
                  />
                  {errors.employmentType && (
                    <span className="text-sm text-red-500">{errors.employmentType.message}</span>
                  )}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <Label>Location</Label>
                    <FormInputField
                      type="text"
                      placeholder="Location"
                      name="location"
                      register={register}
                      error={errors.location}
                      disabled={published}
                    />
                  </div>

                  <div className={published ? 'cursor-not-allowed' : ''}>
                    <Label>Location Type</Label>
                    <Controller
                      name="locationType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isMulti
                          options={locationTypeOptions}
                          className={`w-full ${errors.locationType ? 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25' : ''}`}
                          isDisabled={published}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className={published ? 'cursor-not-allowed' : ''}>
                    <Label>Education</Label>
                    <Controller
                      name="education"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isMulti
                          options={educationOptions}
                          className={`w-full ${errors.education ? 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25' : ''}`}
                          isDisabled={published}
                        />
                      )}
                    />
                  </div>

                  <div className={published ? 'cursor-not-allowed' : ''}>
                    <Label>Experience</Label>
                    <Controller
                      name="experience"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isMulti
                          options={experienceOptions}
                          className={`w-full ${errors.experience ? 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25' : ''}`}
                          isDisabled={published}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className={published ? 'cursor-not-allowed' : ''}>
                  <Label>Language(s)</Label>
                  <Controller
                    name="language"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={languageOptions}
                        className={`w-full ${errors.language ? 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25' : ''}`}
                        isDisabled={published}
                      />
                    )}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <Controller
                    name="salary.enabled"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        onChange={value => {
                          setValue('salary.enabled', !watchSalary)
                        }}
                        onText="Salary"
                        offText="Salary"
                        disabled={published}
                      />
                    )}
                  />
                  <Controller
                    name="salary.range"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        onChange={value => setValue('salary.range', !watchRange)}
                        onText="Salary Range"
                        offText="Salary Range"
                        disabled={!watchSalary || published}
                      />
                    )}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-4">
                  {!watchRange && (
                    <div className="col-span-2">
                      <Label>
                        Base Salary {watchSalary && <span className="text-rose-500">*</span>}
                      </Label>
                      <FormInputField
                        type="number"
                        placeholder="Base Salary"
                        name="salary.base"
                        register={register}
                        error={errors.salary?.base}
                        disabled={!watchSalary || published}
                      />
                    </div>
                  )}

                  {watchRange && (
                    <>
                      <div>
                        <Label>
                          Min Salary {watchSalary && <span className="text-rose-500">*</span>}
                        </Label>
                        <FormInputField
                          type="number"
                          placeholder="Min Salary"
                          name="salary.minSalary"
                          register={register}
                          error={errors.salary?.minSalary}
                          disabled={!watchSalary || published}
                        />
                      </div>
                      <div>
                        <Label>
                          Max Salary {watchSalary && <span className="text-rose-500">*</span>}
                        </Label>
                        <FormInputField
                          type="number"
                          placeholder="Max Salary"
                          name="salary.maxSalary"
                          register={register}
                          error={errors.salary?.maxSalary}
                          disabled={!watchSalary || published}
                        />
                      </div>
                    </>
                  )}
                  <div className={published ? 'cursor-not-allowed' : ''}>
                    <Label>
                      Currency {watchSalary && <span className="text-rose-500">*</span>}
                    </Label>
                    <Controller
                      name="salary.currency"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={currencyOptions}
                          className={`w-full ${errors.salary?.currency ? 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25' : ''}`}
                          isDisabled={!watchSalary || published}
                        />
                      )}
                    />
                  </div>

                  <div className={published ? 'cursor-not-allowed' : ''}>
                    <Label>
                      Salary Type {watchSalary && <span className="text-rose-500">*</span>}
                    </Label>
                    <Controller
                      name="salary.salaryType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={salaryTypeOptions}
                          className={`w-full ${errors.salary?.salaryType ? 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25' : ''}`}
                          isDisabled={!watchSalary || published}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-8 rounded-md border border-slate-200 bg-white p-6">
                <div>
                  <Label>Description</Label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        className="form-textarea w-full"
                        {...field}
                        rows={3}
                        maxLength={140}
                        disabled={published}
                      />
                    )}
                  />
                </div>

                <div>
                  <Label>Rich Text</Label>
                  <Controller
                    name="richText"
                    control={control}
                    render={({ field }) => (
                      <LexicalEditor
                        value={field.value}
                        onChange={editorState => {
                          const jsonState = editorState.toJSON()
                          field.onChange(jsonState)
                        }}
                        editable={!published}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-8 rounded-md border border-slate-200 bg-white p-6">
                <div>
                  <Label>Skills</Label>
                  <Controller
                    control={control}
                    name="skills"
                    render={({ field }) => (
                      <InputList field={field} setValue={setValue} disabled={published} />
                    )}
                  />
                </div>

                <div>
                  <Label>Certifications</Label>
                  <Controller
                    control={control}
                    name="certifications"
                    render={({ field }) => (
                      <InputList field={field} setValue={setValue} disabled={published} />
                    )}
                  />
                </div>

                <div>
                  <Label>Respons.</Label>
                  <Controller
                    control={control}
                    name="responsibilities"
                    render={({ field }) => (
                      <InputList field={field} setValue={setValue} disabled={published} />
                    )}
                  />
                </div>

                <div>
                  <Label>Benefits</Label>
                  <Controller
                    control={control}
                    name="benefits"
                    render={({ field }) => (
                      <InputList field={field} setValue={setValue} disabled={published} />
                    )}
                  />
                </div>
              </div>
            </div>
          </Section>
          <Aside>
            <div className="mb-8 sm:flex sm:items-center sm:justify-between">
              <div className="mb-4 flex items-center gap-2 sm:mb-0">
                <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">More</h1>
              </div>
            </div>
            <div className="sticky top-8 space-y-8">
              <div className="space-y-4 rounded-md border border-yellow-400 bg-white p-6 shadow-lg shadow-yellow-100">
                <Label className="flex items-center">
                  <StarIcon className="h-6 w-6 fill-yellow-400" />
                  <span className="ml-2">Featured</span>
                </Label>
                <Switch
                  name="featured"
                  value={false}
                  onText="Featured"
                  offText="Not Featured"
                  disabled
                />
              </div>

              <div className="space-y-8 rounded-md border border-slate-200 bg-white p-6">
                <div>
                  <Label>Suitable For</Label>
                  <div className="space-y-4">
                    <Label>
                      <Controller
                        name="suitableFor.students"
                        control={control}
                        render={({ field }) => (
                          <Checkbox {...field} label="Students" disabled={published} />
                        )}
                      />
                    </Label>

                    <Label>
                      <Controller
                        name="suitableFor.disabledPeople"
                        control={control}
                        render={({ field }) => (
                          <Checkbox {...field} label="Disabled People" disabled={published} />
                        )}
                      />
                    </Label>

                    <Label>
                      <Controller
                        name="suitableFor.mothersOnMaternityLeave"
                        control={control}
                        render={({ field }) => (
                          <Checkbox {...field} label="Mothers on ML" disabled={published} />
                        )}
                      />
                    </Label>

                    <Label>
                      <Controller
                        name="suitableFor.retirees"
                        control={control}
                        render={({ field }) => (
                          <Checkbox {...field} label="Retirees" disabled={published} />
                        )}
                      />
                    </Label>
                  </div>
                </div>

                {/* TODO: Implement this feature
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Switch
                      name="hasEndDate"
                      value={hasEndDate}
                      onText="Has End Date"
                      offText="No End Date"
                      onChange={() => setHasEndDate(!hasEndDate)}
                  />
                  </div>
                </div>
                */}

                <div>
                  <Label>Apply URL</Label>
                  <FormInputField
                    type="url"
                    placeholder="Apply URL"
                    name="customApplyUrl"
                    register={register}
                    error={errors.customApplyUrl}
                    disabled={published}
                  />
                </div>
              </div>
            </div>
          </Aside>
        </Article>
      </Gutter>
      <div className="sticky bottom-0 z-50 mt-16 border-t border-slate-300 bg-white/50 py-10 backdrop-blur-md">
        <Gutter>
          <div className="flex gap-4">
            <Link href="/account/jobs" className="w-1/2" passHref>
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-white shadow-md hover:bg-slate-50/50"
                type="button"
              >
                Go Back
              </Button>
            </Link>
            {published ? (
              <Button
                size="lg"
                className="w-1/2 shadow-md"
                type="button"
                disabled={!canPublish}
                onClick={() => {
                  toast.success("Request sent. We'll let you know 😊")
                }}
              >
                Ask to Edit
              </Button>
            ) : (
              <Button size="lg" className="w-1/2 shadow-md" type="submit" disabled={!canPublish}>
                Save Job
              </Button>
            )}
          </div>
        </Gutter>
      </div>
    </form>
  )
}

export { JobsEditView }

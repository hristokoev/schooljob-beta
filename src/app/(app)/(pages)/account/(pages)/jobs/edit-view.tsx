'use client'

import { Controller, useForm } from 'react-hook-form'
import React, { useCallback, useEffect } from 'react'
import Link from 'next/link'
import { StarIcon } from '@heroicons/react/24/solid'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
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
import {
  categoriesOptions,
  currencyOptions,
  cz,
  educationOptions,
  employmentTypeOptions,
  experienceOptions,
  languageOptions,
  locationTypeOptions,
  salaryTypeOptions,
} from '@/payload/data'
import { JobFieldSchema, JobFormData } from '@/types'
import { createOrUpdateJob } from '@/actions'

interface JobsEditViewProps {
  id?: string
}

const JobsEditView: React.FC<Partial<JobFormData> & JobsEditViewProps> = formData => {
  const t = useTranslations()
  const { id } = formData

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    setValue,
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
      await toast.promise(createOrUpdateJob(data, id), {
        loading: t('ui.submitting'),
        success: () => {
          router.push('/account/jobs')

          return id ? t('editJob.successUpdated') : t('editJob.successCreated')
        },
        error: message => message,
        richColors: true,
      })
    },
    [id, router, t],
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
                  <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
                    {t('editJob.jobDetails')}
                  </h1>
                </div>
              </div>
              <div className="space-y-8 rounded-md border border-slate-200 bg-white p-6">
                {status && (
                  <Message
                    success={published}
                    warning={!published}
                    message={t(`search.options.${status}` as 'search.status')}
                    className="w-full"
                  />
                )}
                <div>
                  <Label>
                    {t('editJob.title')} <span className="text-rose-500">*</span>
                  </Label>
                  <FormInputField
                    type="text"
                    placeholder={t('editJob.titlePlaceholder')}
                    name="title"
                    register={register}
                    error={errors.title}
                    disabled={published}
                  />
                </div>

                <div className={published ? 'cursor-not-allowed' : ''}>
                  <Label>
                    {t('editJob.categories')} <span className="text-rose-500">*</span>
                  </Label>
                  <Controller
                    name="categories"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={categoriesOptions.map(category => ({
                          value: category,
                          label: t(`search.options.${category}` as 'search.category'),
                        }))}
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
                    {t('editJob.employment')} <span className="text-rose-500">*</span>
                  </Label>
                  <Controller
                    name="employmentType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={employmentTypeOptions.map(employmentType => ({
                          value: employmentType,
                          label: t(`search.options.${employmentType}` as 'search.employmentType'),
                        }))}
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
                    <Label>{t('editJob.location')}</Label>
                    <Controller
                      name="location"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isMulti
                          options={cz}
                          className={`w-full ${errors.location ? 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25' : ''}`}
                          isDisabled={published}
                        />
                      )}
                    />
                  </div>

                  <div className={published ? 'cursor-not-allowed' : ''}>
                    <Label>{t('editJob.locationType')}</Label>
                    <Controller
                      name="locationType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isMulti
                          options={locationTypeOptions.map(locationType => ({
                            value: locationType,
                            label: t(`search.options.${locationType}` as 'search.locationType'),
                          }))}
                          className={`w-full ${errors.locationType ? 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25' : ''}`}
                          isDisabled={published}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className={published ? 'cursor-not-allowed' : ''}>
                    <Label>{t('editJob.education')}</Label>
                    <Controller
                      name="education"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isMulti
                          options={educationOptions.map(education => ({
                            value: education,
                            label: t(`search.options.${education}` as 'search.education'),
                          }))}
                          className={`w-full ${errors.education ? 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25' : ''}`}
                          isDisabled={published}
                        />
                      )}
                    />
                  </div>

                  <div className={published ? 'cursor-not-allowed' : ''}>
                    <Label>{t('editJob.experience')}</Label>
                    <Controller
                      name="experience"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isMulti
                          options={experienceOptions.map(experience => ({
                            value: experience,
                            label: t(`search.options.${experience}` as 'search.experience'),
                          }))}
                          className={`w-full ${errors.experience ? 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25' : ''}`}
                          isDisabled={published}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className={published ? 'cursor-not-allowed' : ''}>
                  <Label>{t('editJob.language')}</Label>
                  <Controller
                    name="language"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={languageOptions.map(language => ({
                          value: language,
                          label: t(`search.options.${language}` as 'search.language'),
                        }))}
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
                        onChange={() => {
                          setValue('salary.enabled', !watchSalary)
                        }}
                        onText={t('editJob.salaryOn')}
                        offText={t('editJob.salaryOff')}
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
                        onChange={() => setValue('salary.range', !watchRange)}
                        onText={t('editJob.salaryRangeOn')}
                        offText={t('editJob.salaryRangeOff')}
                        disabled={!watchSalary || published}
                      />
                    )}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-4">
                  {!watchRange && (
                    <div className="col-span-2">
                      <Label>
                        {t('editJob.salaryBase')}{' '}
                        {watchSalary && <span className="text-rose-500">*</span>}
                      </Label>
                      <FormInputField
                        type="number"
                        placeholder={t('editJob.salaryBasePlaceholder')}
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
                          {t('editJob.salaryMin')}{' '}
                          {watchSalary && <span className="text-rose-500">*</span>}
                        </Label>
                        <FormInputField
                          type="number"
                          placeholder={t('editJob.salaryMinPlaceholder')}
                          name="salary.minSalary"
                          register={register}
                          error={errors.salary?.minSalary}
                          disabled={!watchSalary || published}
                        />
                      </div>
                      <div>
                        <Label>
                          {t('editJob.salaryMax')}{' '}
                          {watchSalary && <span className="text-rose-500">*</span>}
                        </Label>
                        <FormInputField
                          type="number"
                          placeholder={t('editJob.salaryMaxPlaceholder')}
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
                      {t('editJob.salaryCurrency')}{' '}
                      {watchSalary && <span className="text-rose-500">*</span>}
                    </Label>
                    <Controller
                      name="salary.currency"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={currencyOptions.map(currency => ({
                            value: currency,
                            label: t(`search.options.${currency}` as 'search.currency'),
                          }))}
                          className={`w-full ${errors.salary?.currency ? 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25' : ''}`}
                          isDisabled={!watchSalary || published}
                        />
                      )}
                    />
                  </div>

                  <div className={published ? 'cursor-not-allowed' : ''}>
                    <Label>
                      {t('editJob.salaryType')}{' '}
                      {watchSalary && <span className="text-rose-500">*</span>}
                    </Label>
                    <Controller
                      name="salary.salaryType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={salaryTypeOptions.map(salaryType => {
                            return {
                              value: salaryType,
                              label: t(`search.options.${salaryType}` as 'search.salaryType'),
                            }
                          })}
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
                  <Label>{t('editJob.description')}</Label>
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
                  <Label>{t('editJob.richText')}</Label>
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
                  <Label>{t('editJob.skills')}</Label>
                  <Controller
                    control={control}
                    name="skills"
                    render={({ field }) => (
                      <InputList field={field} setValue={setValue} disabled={published} />
                    )}
                  />
                </div>

                <div>
                  <Label>{t('editJob.certifications')}</Label>
                  <Controller
                    control={control}
                    name="certifications"
                    render={({ field }) => (
                      <InputList field={field} setValue={setValue} disabled={published} />
                    )}
                  />
                </div>

                <div>
                  <Label>{t('editJob.responsibilities')}</Label>
                  <Controller
                    control={control}
                    name="responsibilities"
                    render={({ field }) => (
                      <InputList field={field} setValue={setValue} disabled={published} />
                    )}
                  />
                </div>

                <div>
                  <Label>{t('editJob.benefits')}</Label>
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
                <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
                  {t('editJob.aside')}
                </h1>
              </div>
            </div>
            <div className="sticky top-8 space-y-8">
              <div className="space-y-4 rounded-md border border-yellow-400 bg-white p-6 shadow-lg shadow-yellow-100">
                <Label className="flex items-center">
                  <StarIcon className="h-6 w-6 fill-yellow-400" />
                  <span className="ml-2">{t('editJob.featured')}</span>
                </Label>
                <Switch
                  name="featured"
                  value={false}
                  onText={t('editJob.featuredOn')}
                  offText={t('editJob.featuredOff')}
                  disabled
                />
              </div>

              <div className="space-y-8 rounded-md border border-slate-200 bg-white p-6">
                <div>
                  <Label>{t('editJob.suitableFor')}</Label>
                  <div className="space-y-4">
                    <Label>
                      <Controller
                        name="suitableFor.students"
                        control={control}
                        render={({ field }) => (
                          <Checkbox {...field} label={t('editJob.students')} disabled={published} />
                        )}
                      />
                    </Label>

                    <Label>
                      <Controller
                        name="suitableFor.disabledPeople"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            {...field}
                            label={t('editJob.disabledPeople')}
                            disabled={published}
                          />
                        )}
                      />
                    </Label>

                    <Label>
                      <Controller
                        name="suitableFor.mothersOnMaternityLeave"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            {...field}
                            label={t('editJob.mothersOnMaternityLeave')}
                            disabled={published}
                          />
                        )}
                      />
                    </Label>

                    <Label>
                      <Controller
                        name="suitableFor.retirees"
                        control={control}
                        render={({ field }) => (
                          <Checkbox {...field} label={t('editJob.retirees')} disabled={published} />
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
                  <Label>{t('editJob.applyUrl')}</Label>
                  <FormInputField
                    type="url"
                    placeholder={t('editJob.applyUrlPlaceholder')}
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
                {t('ui.goBack')}
              </Button>
            </Link>
            {published ? (
              <Button
                size="lg"
                className="w-1/2 shadow-md"
                type="button"
                disabled={!canPublish}
                onClick={() => {
                  // TODO: Implement this feature
                  toast.success(t('editJob.askToEditRequested'))
                }}
              >
                {t('editJob.askToEdit')}
              </Button>
            ) : (
              <Button size="lg" className="w-1/2 shadow-md" type="submit" disabled={!canPublish}>
                {t('editJob.saveJob')}
              </Button>
            )}
          </div>
        </Gutter>
      </div>
    </form>
  )
}

export { JobsEditView }

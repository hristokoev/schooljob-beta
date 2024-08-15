'use client'

import { Controller, useForm } from 'react-hook-form'
import { ImageCover, Logo, Organization, User } from '@payload-types'
import React, { useCallback, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, EditUpload, FormInputField, Label, Select, Textarea } from '@/components'
import { categoriesOptions, cz } from '@/payload/data'
import { OrganizationFormData, useOrganizationFieldSchema } from '@/types'
import { updateOrganization, uploadImage } from '@/actions'
import { LexicalEditor } from '@/components'
import { useAuth } from '@/providers'

const OrganizationPanel: React.FC<{ user: User }> = ({ user }) => {
  const t = useTranslations()
  const OrganizationFieldSchema = useOrganizationFieldSchema()
  const { setUser } = useAuth()
  const organization = user?.profile?.value as Organization
  const organizationLogo = (organization?.logo as Logo) || null
  const organizationImageCover = (organization?.imageCover as ImageCover) || null
  const router = useRouter()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
    control,
    setValue,
    watch,
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(OrganizationFieldSchema),
    defaultValues: {
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
    },
  })

  const logo = watch('logo') || organizationLogo
  const imageCover = watch('imageCover') || organizationImageCover
  const setLogo = useCallback(
    (value: Logo | null) => setValue('logo', value, { shouldDirty: true }),
    [setValue],
  )
  const setImageCover = useCallback(
    (value: ImageCover | null) => setValue('imageCover', value, { shouldDirty: true }),
    [setValue],
  )

  useEffect(() => {
    if (organization === null) {
      router.push(
        `/login?error=${encodeURIComponent(
          t('authentication.errors.unauthorized'),
        )}&redirect=${encodeURIComponent('/account')}`,
      )
    }

    if (organization) {
      reset({
        title: organization?.title || '',
        vatId: organization?.vatId || '',
        categories:
          organization?.categories?.map(category => {
            return {
              label: t(`search.options.${category}`),
              value: category,
            }
          }) || [],
        location:
          organization?.location?.map(location => ({
            label: cz.find(l => l.value === location)?.label,
            value: location,
          })) || [],
        phone: organization?.phone || '',
        url: organization?.url || '',
        description: organization?.description || '',
        richText: organization?.richText || {
          root: { type: '', children: [], direction: null, format: '', indent: 0, version: 0 },
        },
        logo: organizationLogo || null || undefined,
        imageCover: organizationImageCover || null || undefined,
      })
    }
  }, [reset, organization, organizationLogo, organizationImageCover, router, t])

  const onSubmit = useCallback(
    (data: OrganizationFormData) => {
      toast.promise(
        (async () => {
          let logoDoc: Logo | null = null
          let imageCoverDoc: ImageCover | null = null

          // Check if logo has changed
          if (logo && logo.id !== organizationLogo?.id) {
            if (logo.url?.startsWith('data:')) {
              // Only upload if it's a new base64 image
              logoDoc = await uploadImage(logo, user, 'logos')
            }
          }

          // Check if imageCover has changed
          if (imageCover && imageCover.id !== organizationImageCover?.id) {
            if (imageCover.url?.startsWith('data:')) {
              // Only upload if it's a new base64 image
              imageCoverDoc = await uploadImage(imageCover, user, 'image-covers')
            }
          }

          const updatedData = {
            ...data,
            ...(logoDoc ? { logo: logoDoc } : {}),
            ...(imageCoverDoc ? { imageCover: imageCoverDoc } : {}),
          }

          await updateOrganization(updatedData, user)

          setUser({
            ...user,
            profile: {
              relationTo: 'organizations',
              value: {
                ...(user.profile?.value as Organization),
                title: data.title,
                description: data.description,
                richText: data.richText,
                location: data.location?.map(location => location.value as 'praha') || [],
                phone: data.phone,
                url: data.url,
                vatId: data.vatId,
                logo: logo && logo.id !== organizationLogo?.id ? logoDoc : organizationLogo,
                imageCover:
                  imageCover && imageCover.id !== organizationImageCover?.id
                    ? imageCoverDoc
                    : organizationImageCover,
              },
            },
          })

          router.push('/account')
        })(),
        {
          loading: t('organizationSettings.loading'),
          success: t('organizationSettings.success'),
          error: t('organizationSettings.error'),
        },
      )
    },
    [user, setUser, logo, imageCover, organizationLogo, organizationImageCover, router, t],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grow">
      <div className="space-y-6 p-6">
        <h2 className="mb-5 text-2xl font-bold text-slate-800">
          {t('organizationSettings.header')}
        </h2>
        <section>
          <h2 className="mb-1 text-xl font-bold leading-snug text-slate-800">
            {t('organizationSettings.subheader')}
          </h2>
          <div className="mt-4 space-y-4 sm:grid sm:items-center sm:gap-2 sm:space-y-0 lg:grid-cols-3">
            <EditUpload
              name="logo"
              image={logo}
              setImage={setLogo}
              minWidth={160}
              minHeight={160}
            />
            <EditUpload
              name="image cover"
              image={imageCover}
              setImage={setImageCover}
              minWidth={1200}
              minHeight={224}
              className="lg:col-span-2"
            />
          </div>
          <div className="mt-4 text-sm">{t('organizationSettings.uploadDescription')}</div>
          <div className="mt-4 grid-cols-3 space-y-4 sm:grid sm:items-center sm:gap-2 sm:space-y-0">
            <div>
              <Label>{t('organizationSettings.title')}</Label>
              <FormInputField
                type="text"
                name="title"
                register={register}
                error={errors.title}
                className="w-full"
                disabled
              />
            </div>
            <div>
              <Label>{t('organizationSettings.vatId')}</Label>
              <FormInputField
                type="text"
                name="vatId"
                register={register}
                error={errors.vatId}
                className="w-full"
              />
            </div>
            <div>
              <Label>{t('organizationSettings.categories')}</Label>
              <Controller
                name="categories"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    placeholder={t('organizationSettings.categoriesPlaceholder')}
                    options={categoriesOptions.map(category => {
                      return {
                        value: category,
                        label: t(`search.options.${category}` as 'search.category'),
                      }
                    })}
                    className={`w-full ${errors.categories ? 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25' : ''}`}
                  />
                )}
              />
            </div>
            <div>
              <Label>{t('organizationSettings.location')}</Label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={cz}
                    className={`w-full ${errors.location ? 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25' : ''}`}
                  />
                )}
              />
            </div>
            <div>
              <Label>{t('organizationSettings.phone')}</Label>
              <FormInputField
                type="text"
                name="phone"
                register={register}
                error={errors.phone}
                className="w-full"
              />
            </div>
            <div>
              <Label>{t('organizationSettings.url')}</Label>
              <FormInputField
                type="text"
                name="url"
                register={register}
                error={errors.url}
                className="w-full"
              />
            </div>
          </div>
          <div className="mt-4">
            <Label>{t('organizationSettings.description')}</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea className="w-full" {...field} rows={3} maxLength={140} />
              )}
            />
          </div>
          <div className="mt-4">
            <Label>{t('organizationSettings.richText')}</Label>
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
                />
              )}
            />
          </div>
        </section>
      </div>
      <footer>
        <div className="flex flex-col border-t border-slate-200 px-6 py-5">
          <div className="flex gap-2 space-y-4 self-end sm:space-y-0">
            <Link href="/account">
              <Button type="button" variant="outline">
                {t('ui.cancel')}
              </Button>
            </Link>
            <Button disabled={!isDirty}>{t('ui.saveChanges')}</Button>
          </div>
        </div>
      </footer>
    </form>
  )
}

export { OrganizationPanel }

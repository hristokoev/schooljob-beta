'use client'

import { Controller, useForm } from 'react-hook-form'
import React, { useCallback, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'

import { Button, EditUpload, FormInputField, Label, Textarea } from '@/components'
import { useCandidateFieldSchema, CandidateFormData } from '@/types'
import { User, Candidate, Photo } from '@payload-types'
import { uploadImage, updateCandidate } from '@/actions'
import { useAuth } from '@/providers'

const CandidatePanel: React.FC<{ user: User }> = ({ user }) => {
  const t = useTranslations()
  const CandidateFieldSchema = useCandidateFieldSchema()
  const { setUser } = useAuth()
  const candidate = user?.profile?.value as Candidate
  const candidatePhoto = (candidate?.photo as Photo) || null
  const router = useRouter()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
    control,
    setValue,
    watch,
  } = useForm<CandidateFormData>({
    resolver: zodResolver(CandidateFieldSchema),
  })

  const photo = watch('photo') || candidatePhoto
  const setPhoto = useCallback(
    (value: Photo | null) => setValue('photo', value, { shouldDirty: true }),
    [setValue],
  )

  useEffect(() => {
    if (candidate === null) {
      router.push(
        `/login?error=${encodeURIComponent(
          t('authentication.errors.unauthorized'),
        )}&redirect=${encodeURIComponent('/account')}`,
      )
    }

    if (candidate) {
      reset({
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        bio: candidate.bio || '',
        location: candidate.location || '',
        phone: candidate.phone || '',
        photo: candidatePhoto || null || undefined,
      })
    }
  }, [reset, candidate, candidatePhoto, router, t])

  const onSubmit = useCallback(
    (data: CandidateFormData) => {
      toast.promise(
        async () => {
          let photoDoc: Photo | null = null

          // Check if logo has changed
          if (photo && photo.id !== candidatePhoto?.id) {
            if (photo.url?.startsWith('data:')) {
              // Only upload if it's a new base64 image
              photoDoc = await uploadImage(photo, user, 'photos')
            }
          }

          const updatedData = {
            ...data,
            ...(photoDoc ? { photo: photoDoc } : {}),
          }

          await updateCandidate(updatedData, user)

          setUser({
            ...user,
            profile: {
              relationTo: 'candidates',
              value: {
                ...(user.profile?.value as Candidate),
                firstName: data.firstName,
                lastName: data.lastName,
                bio: data.bio,
                location: data.location,
                phone: data.phone,
                photo: photo && photo.id !== candidatePhoto?.id ? photoDoc : candidatePhoto,
              },
            },
          })

          router.push('/account')
        },
        {
          loading: t('candidateSettings.loading'),
          success: t('candidateSettings.success'),
          error: t('candidateSettings.error'),
        },
      )
    },
    [user, setUser, photo, candidatePhoto, router, t],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grow">
      <div className="space-y-6 p-6">
        <h2 className="mb-5 text-2xl font-bold text-slate-800">{t('candidateSettings.header')}</h2>
        <section>
          <h2 className="mb-1 text-xl font-bold leading-snug text-slate-800">
            {t('candidateSettings.subheader')}
          </h2>
          <div className="mt-4 space-y-4 sm:grid sm:items-center sm:gap-2 sm:space-y-0 lg:grid-cols-3">
            <EditUpload
              name="photo"
              image={photo}
              setImage={setPhoto}
              minWidth={160}
              minHeight={160}
            />
          </div>
          <div className="mt-4 text-sm">{t('candidateSettings.uploadDescription')}</div>
          <div className="mt-4 grid-cols-2 space-y-4 sm:grid sm:items-center sm:gap-2 sm:space-y-0">
            <div>
              <Label>{t('candidateSettings.firstName')}</Label>
              <FormInputField
                type="text"
                name="firstName"
                register={register}
                error={errors.firstName}
                className="w-full"
                disabled
              />
            </div>
            <div>
              <Label>{t('candidateSettings.lastName')}</Label>
              <FormInputField
                type="text"
                name="lastName"
                register={register}
                error={errors.lastName}
                className="w-full"
                disabled
              />
            </div>
            <div>
              <Label>{t('candidateSettings.location')}</Label>
              <FormInputField
                type="text"
                name="location"
                register={register}
                error={errors.location}
                className="w-full"
              />
            </div>
            <div>
              <Label>{t('candidateSettings.phone')}</Label>
              <FormInputField
                type="text"
                name="phone"
                register={register}
                error={errors.phone}
                className="w-full"
              />
            </div>
          </div>
          <div className="mt-4">
            <Label>{t('candidateSettings.bio')}</Label>
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <Textarea className="w-full" {...field} rows={3} maxLength={140} />
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

export { CandidatePanel }

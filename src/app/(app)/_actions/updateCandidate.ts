'use server'

import { Candidate, User } from '@payload-types'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'

import { CandidateFormData } from '@/types'

export const updateCandidate = async (data: CandidateFormData, user: User | null | undefined) => {
  const t = await getTranslations()
  const id = (user?.profile?.value as Candidate).id as string

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  if (id) {
    try {

      const doc = await payload.update({
        collection: 'candidates',
        id,
        data: {
          location: data.location,
          phone: data.phone,
          bio: data.bio,
          photo: data.photo?.id,
        },
        overrideAccess: false,
        user
      })

      if (!doc) {
        throw new Error(t('errors.updateCandidate'))
      }

      return doc
    } catch {
      throw new Error(t('errors.updateCandidate'))
    }
  }

  throw new Error(t('errors.noCandidate'))
}

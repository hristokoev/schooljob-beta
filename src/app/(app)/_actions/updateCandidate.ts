'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'

import { Candidate, User } from '@payload-types'
import configPromise from '@payload-config'

import { CandidateFormData } from '@/types'

export const updateCandidate = async (data: CandidateFormData, user: User | null | undefined) => {
  const id = (user?.profile?.value as Candidate).id as string

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  if (id) {
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
      throw new Error('Error updating organization')
    }

    return doc
  }
}
'use server'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { getMeUser } from '@/utilities/getMeUser'
import { Candidate, User } from '@payload-types'

export const updateCandidate = async (data: any) => {
  const { user } = await getMeUser()
  const { id } = user?.profile?.value as Candidate
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  if (id) {
    const doc = await payload.update({
      collection: 'candidates',
      id,
      data,
      user
    })

    if (!doc) {
      throw new Error('Error updating candidate')
    }

    return doc
  }

}

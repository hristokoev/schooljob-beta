'use server'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { Organization, User } from '@payload-types'
import { transformToPayload } from '@/utilities'

export const updateOrganization = async (data: any, user: User | null | undefined) => {
  const id = (user?.profile?.value as Organization).id as string

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  if (id) {
    const doc = await payload.update({
      collection: 'organizations',
      id,
      data: {
        ...data,
        categories: transformToPayload(data.categories),
      },
      overrideAccess: false,
      user
    })

    if (!doc) {
      throw new Error('Error updating job')
    }

    return doc
  }

}

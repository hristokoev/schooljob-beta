'use server'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { transformToPayload } from '@/utilities'
import { getMeUser } from '@/utilities/getMeUser'

export const updateOrganization = async (data: any, id?: string) => {
  const { user } = await getMeUser()

  const organizationData = {
    ...data,
    categories: transformToPayload(data.categories),
  }

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  if (id) {
    const doc = await payload.update({
      collection: 'organizations',
      id,
      data: organizationData,
      user
    })

    if (!doc) {
      throw new Error('Error updating job')
    }

    return doc
  }

}

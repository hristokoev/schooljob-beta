'use server'

import { Logo, Organization, User } from '@payload-types'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { OrganizationFormData } from '@/types'
import { transformToPayload } from '../_utilities'

export const updateOrganization = async (data: OrganizationFormData, user: User | null | undefined) => {
  const id = (user?.profile?.value as Organization).id as string

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  if (id) {
    const doc = await payload.update({
      collection: 'organizations',
      id,
      data: {
        title: data.title,
        vatId: data.vatId,
        ...(data.categories ? { categories: transformToPayload(data.categories) as Organization['categories'] } : []),
        location: data.location,
        phone: data.phone,
        url: data.url,
        description: data.description,
        richText: data.richText ? {
          ...data.richText,
          root: {
            ...data.richText.root,
            children: data.richText.root.children.map(child => ({
              ...child,
              version: child.version || 1
            }))
          }
        } : null,
        logo: data.logo?.id,
        imageCover: data.imageCover?.id,
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
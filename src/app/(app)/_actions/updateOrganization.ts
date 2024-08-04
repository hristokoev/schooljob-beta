'use server'

import { Organization, User } from '@payload-types'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'

import { OrganizationFormData } from '@/types'

export const updateOrganization = async (data: OrganizationFormData, user: User | null | undefined) => {
  const t = await getTranslations()
  const id = (user?.profile?.value as Organization).id as string

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  if (id) {
    try {
      const doc = await payload.update({
        collection: 'organizations',
        id,
        data: {
          title: data.title,
          vatId: data.vatId,
          ...(data.categories ? data.categories.map(category => category.value) : []),
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
        throw new Error(t('errors.updateOrganization'))
      }

      return doc
    } catch (error) {
      throw new Error(t('errors.updateOrganization'))
    }
  }

  throw new Error(t('errors.noOrganization'))
}
import type { CollectionConfig } from 'payload'

import { createdBy } from '@/payload/fields'
import { obfuscateFilename } from './hooks/obfuscateFilename'
import { populateCreatedBy } from '@/payload/hooks'
import { SA_A } from '@/payload/access'

export const Banners: CollectionConfig = {
  slug: 'banners',
  labels: {
    singular: {
      en: 'Banner',
      cs: 'Banner',
    },
    plural: {
      en: 'Banners',
      cs: 'Bannery',
    }
  },
  admin: {
    group: {
      en: 'Files',
      cs: 'Soubory',
    },
    useAsTitle: 'filename',
    hidden: ({ user }) => user?.role !== 'super-admin'
  },
  hooks: {
    beforeChange: [obfuscateFilename, populateCreatedBy],
  },
  access: {
    create: ({ req: { user } }) => {
      return user !== undefined
    },
    read: () => true,
    update: SA_A,
    delete: SA_A,
  },
  upload: {
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    crop: false,
  },
  fields: [
    createdBy
  ],
}

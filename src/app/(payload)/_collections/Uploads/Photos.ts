import type { CollectionConfig } from 'payload'

import { SA, SA_A } from '@/payload/access'
import { createdBy } from '@/payload/fields'
import { obfuscateFilename } from './hooks/obfuscateFilename'
import { populateCreatedBy } from '@/payload/hooks'

export const Photos: CollectionConfig = {
  slug: 'photos',
  labels: {
    singular: 'Photo',
    plural: 'Photos',
  },
  admin: {
    group: 'Files',
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
    delete: SA,
  },
  upload: {
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    crop: false,
    resizeOptions: {
      fit: 'cover',
      width: 160,
      height: 160,
    }
  },
  fields: [
    createdBy
  ],
}

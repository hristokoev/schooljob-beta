import type { CollectionConfig } from 'payload'

import { SA, SA_A } from '@/payload/access'
import { obfuscateFilename } from './hooks/obfuscateFilename'
import { populateCreatedBy } from '@/payload/hooks'
import { createdBy } from '@/payload/fields'

export const Photos: CollectionConfig = {
  slug: 'photos',
  labels: {
    singular: 'Photo',
    plural: 'Photos',
  },
  admin: {
    group: 'Files',
    useAsTitle: 'filename',
    // hidden: ({ user }) => user?.role === 'organization' || user?.role === 'candidate',
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

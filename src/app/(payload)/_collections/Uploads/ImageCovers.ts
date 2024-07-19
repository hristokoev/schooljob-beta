import type { CollectionConfig } from 'payload'

import { SA, SA_A } from '@/payload/access'
import { obfuscateFilename } from './hooks/obfuscateFilename'
import { populateCreatedBy } from '@/payload/hooks'
import { createdBy } from '@/payload/fields'

export const ImageCovers: CollectionConfig = {
  slug: 'image-covers',
  labels: {
    singular: 'Image Cover',
    plural: 'Image Covers',
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
      width: 1200,
      height: 224,
    }
  },
  fields: [
    createdBy
  ],
}
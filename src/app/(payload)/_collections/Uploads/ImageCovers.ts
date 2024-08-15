import type { CollectionConfig } from 'payload'

import { SA, SA_A } from '@/payload/access'
import { createdBy } from '@/payload/fields'
import { obfuscateFilename } from './hooks/obfuscateFilename'
import { populateCreatedBy } from '@/payload/hooks'

export const ImageCovers: CollectionConfig = {
  slug: 'image-covers',
  labels: {
    singular: {
      en: 'Image Cover',
      cs: 'Obrázek',
    },
    plural: {
      en: 'Image Covers',
      cs: 'Obrázky',
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

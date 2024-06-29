import type { CollectionConfig } from 'payload'

import { SA_A } from '@/payload/access'
import { obfuscateFilename } from './hooks/obfuscateFilename'
import { populateCreatedBy } from '@/payload/hooks'
import { createdBy } from '@/payload/fields'

export const SiteUploads: CollectionConfig = {
  slug: 'site-uploads',
  labels: {
    singular: 'File',
    plural: 'Files',
  },
  admin: {
    group: 'SchoolJob',
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
    delete: SA_A,
  },
  upload: {

    staticDir: '/site-uploads',
    mimeTypes: ['image/jpeg', 'image/png'],
    crop: false,
  },
  fields: [
    createdBy
  ],
}

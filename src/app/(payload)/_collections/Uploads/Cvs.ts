import { CollectionConfig } from 'payload'

import { SA, SA_C_U } from '@/payload/access'
import { obfuscateFilename } from './hooks/obfuscateFilename'
import { populateCreatedBy } from '@/payload/hooks'
import SA_A_O_Some_C_Self from './access/SA_A_O_Some_C_Self'
import { createdBy } from '@/payload/fields'

export const Cvs: CollectionConfig = {
  slug: 'cvs',
  labels: {
    singular: 'CV',
    plural: 'CVs',
  },
  admin: {
    group: 'SchoolJob',
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'filesize', 'createdBy', 'createdAt'],
    // hidden: ({ user }) => user?.role === 'organization' || user?.role === 'candidate',
  },
  upload: {
    staticDir: '/cvs',
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  hooks: {
    beforeChange: [obfuscateFilename, populateCreatedBy],
  },
  access: {
    create: SA_C_U,
    read: SA_A_O_Some_C_Self,
    update: SA,
    delete: SA,
  },
  fields: [
    {
      name: 'job',
      type: 'relationship',
      relationTo: 'jobs',
      hasMany: false,
      maxDepth: 0,
      access: {
        update: () => false,
      },
      admin: {
        readOnly: true,
        condition: (data) => Boolean(data?.job),
      },
    },
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations',
      hasMany: false,
      maxDepth: 0,
      access: {
        update: () => false,
      },
      admin: {
        readOnly: true,
        condition: (data) => Boolean(data?.organization),
      },
    },
    createdBy
  ],
}

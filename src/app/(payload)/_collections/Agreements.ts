import { CollectionConfig } from 'payload'

import { ARCHIVED, SA, SA_A } from '@/payload/access'
import { archived, slugField } from '@/payload/fields'

export const Agreements: CollectionConfig = {
  slug: 'agreements',
  labels: {
    singular: 'Agreement',
    plural: 'Agreements',
  },
  admin: {
    group: 'SchoolJob',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    hidden: ({ user }) => user?.role === 'organization' || user?.role === 'candidate',
  },
  access: {
    create: SA_A,
    read: () => true,
    update: SA_A,
    delete: SA,
  },
  fields: [
    archived,
    {
      name: 'title',
      type: 'text',
      access: {
        read: ARCHIVED,
      },
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      access: {
        read: ARCHIVED,
      },
      required: true,
    },
    slugField
  ],
}

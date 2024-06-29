import { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { SA_A } from '@/payload/access'
import { slugField } from '@/payload/fields'

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
    // hidden: ({ user }) => user?.role === 'organization' || user?.role === 'candidate',
  },
  access: {
    create: SA_A,
    read: () => true,
    update: SA_A,
    delete: SA_A,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      required: true,
    },
    slugField(),
  ],
}

import { CollectionConfig } from 'payload'

import { SA, SA_A } from '@/payload/access'
import { slugField } from '@/payload/fields'

export const JobCategories: CollectionConfig = {
  slug: 'job-categories',
  labels: {
    singular: 'Category',
    plural: 'Categories',
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
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
  ],
}

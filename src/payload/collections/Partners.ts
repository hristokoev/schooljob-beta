import { CollectionConfig } from 'payload'

import { revalidatePath } from '@/payload/hooks'
import { SA_A } from '@/payload/access'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: {
    singular: {
      en: 'Partner',
      cs: 'Partner',
    },
    plural: {
      en: 'Partners',
      cs: 'Partneři',
    }
  },
  admin: {
    group: {
      en: 'Others',
      cs: 'Další',
    },
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    hidden: ({ user }) => user?.role === 'organization' || user?.role === 'candidate',
  },
  access: {
    create: SA_A,
    read: () => true,
    update: SA_A,
    delete: SA_A,
  },
  hooks: {
    afterChange: [
      revalidatePath,
    ],
  },
  fields: [
    {
      name: 'title',
      label: {
        en: 'Title',
        cs: 'Název',
      },
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      label: {
        en: 'Logo',
        cs: 'Logo',
      },
      type: 'upload',
      relationTo: 'logos',
      required: true,
    },
    {
      name: 'url',
      label: {
        en: 'URL',
        cs: 'URL',
      },
      type: 'text',
      required: true,
    },
  ],
}

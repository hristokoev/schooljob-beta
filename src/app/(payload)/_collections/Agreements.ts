import { CollectionConfig } from 'payload'

import { ARCHIVED, SA, SA_A } from '@/payload/access'
import { archived, slugField } from '@/payload/fields'
import { Archived } from '@/payload/components'

export const Agreements: CollectionConfig = {
  slug: 'agreements',
  labels: {
    singular: {
      en: 'Agreement',
      cs: 'Souhlas',
    },
    plural: {
      en: 'Agreements',
      cs: 'Souhlasy',
    }
  },
  admin: {
    group: {
      en: 'Others',
      cs: 'Další',
    },
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    components: {
      BeforeListTable: [Archived],
    },
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
      label: {
        en: 'Title',
        cs: 'Název',
      },
      type: 'text',
      access: {
        read: ARCHIVED,
      },
      required: true,
    },
    {
      name: 'richText',
      label: {
        en: 'Rich Text',
        cs: 'Text',
      },
      type: 'richText',
      access: {
        read: ARCHIVED,
      },
      required: true,
    },
    slugField
  ],
}

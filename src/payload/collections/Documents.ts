import { CollectionConfig } from 'payload'

import { archived, slugField } from '@/payload/fields'
import { SA, SA_A } from '@/payload/access'

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: {
      en: 'Document',
      cs: 'Dokument',
    },
    plural: {
      en: 'Documents',
      cs: 'Dokumenty',
    },
  },
  admin: {
    group: {
      en: 'Others',
      cs: 'Další',
    },
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    components: {
      beforeListTable: ['src/payload/components/Archived/index.tsx#Archived'],
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
      required: true,
    },
    {
      name: 'richText',
      label: {
        en: 'Rich Text',
        cs: 'Text',
      },
      type: 'richText',
      required: true,
    },
    slugField,
  ],
}

import { CollectionConfig } from 'payload'

import { cs, en } from '@/translations'
import { SA, SA_A } from '@/payload/access'
import { currencyOptions } from '@/payload/data'
import { revalidatePath } from '@/payload/hooks'
import { SA_A_Limit } from './access/SA_A_Limit'
import { slugField } from '@/payload/fields'

export const Memberships: CollectionConfig = {
  slug: 'memberships',
  labels: {
    singular: {
      en: 'Membership',
      cs: 'Členství',
    },
    plural: {
      en: 'Memberships',
      cs: 'Členství',
    },
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
    // Limit to 3 memberships
    create: SA_A_Limit,
    read: () => true,
    update: SA_A,
    delete: SA
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
      name: 'featured',
      label: {
        en: 'Featured',
        cs: 'Vybrané',
      },
      type: 'checkbox',
    },
    {
      name: 'description',
      label: {
        en: 'Description',
        cs: 'Popis',
      },
      type: 'text',
      required: true,
    },
    {
      name: 'features',
      label: {
        en: 'Features',
        cs: 'Výhody',
      },
      type: 'text',
      hasMany: true,
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          label: {
            en: 'Price',
            cs: 'Cena',
          },
          type: 'number',
          admin: {
            width: '50%',
          },
          required: true,
        },
        {
          name: 'currency',
          label: {
            en: 'Currency',
            cs: 'Měna',
          },
          type: 'select',
          defaultValue: 'czk',
          options: currencyOptions.map(option => ({
            label: {
              en: en.search.options[option as keyof typeof en.search.options],
              cs: cs.search.options[option as keyof typeof cs.search.options],
            },
            value: option,
          })),
          admin: {
            width: '50%',
          },
          required: true,
        },
      ],
    },
    {
      name: 'discount',
      label: {
        en: 'Discount(s)',
        cs: 'Sleva(y)',
      },
      type: 'array',
      fields: [
        {
          name: 'count',
          label: {
            en: 'Count',
            cs: 'Počet',
          },
          type: 'number',
          required: true,
        },
        {
          name: 'discount',
          label: {
            en: 'Discount (%)',
            cs: 'Sleva (%)',
          },
          type: 'number',
          required: true,
        },
        {
          name: 'text',
          label: {
            en: 'Text',
            cs: 'Text',
          },
          type: 'text',
          required: true,
        }
      ],
    },
    slugField,
  ],
}

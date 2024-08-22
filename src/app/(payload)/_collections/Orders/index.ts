import { CollectionConfig } from 'payload'

import { cs, en } from '@/translations'
import { SA, SA_A_O, SA_A_O_Self_createdBy } from '@/payload/access'
import { createdBy } from '@/payload/fields'
import { currencyOptions } from '@/payload/data'
import { populateCreatedBy } from '@/payload/hooks'
import { populateOrder } from './hooks/populateOrder'
import { updateOrganizationJobsAllowed } from './hooks/updateOrganizationJobsAllowed'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: {
      en: 'Order',
      cs: 'Objednávka',
    },
    plural: {
      en: 'Orders',
      cs: 'Objednávky',
    },
  },
  admin: {
    group: {
      en: 'Others',
      cs: 'Další',
    },
    useAsTitle: 'organization',
    defaultColumns: ['organization', 'membership', 'expiresAt', 'price', 'currency', 'createdAt', 'expiresAt'],
  },
  access: {
    create: SA_A_O,
    read: SA_A_O_Self_createdBy,
    update: SA,
    delete: SA
  },
  hooks: {
    beforeChange: [populateCreatedBy, populateOrder],
    afterChange: [updateOrganizationJobsAllowed],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'organization',
          label: {
            en: 'Organization',
            cs: 'Organizace',
          },
          type: 'relationship',
          relationTo: 'organizations',
          admin: {
            width: '50%',
          },
          required: true,
        },
        {
          name: 'membership',
          label: {
            en: 'Membership',
            cs: 'Členství',
          },
          type: 'relationship',
          relationTo: 'memberships',
          admin: {
            width: '50%',
          },
          required: true,
        }
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'quantity',
          label: {
            en: 'Quantity',
            cs: 'Počet',
          },
          type: 'number',
          admin: {
            width: '50%',
          },
          required: true,
        },
        {
          name: 'expiresAt',
          label: {
            en: 'Expires At',
            cs: 'Vyprší',
          },
          type: 'date',
          admin: {
            width: '50%',
          },
          required: true,
        }
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          label: {
            en: 'Total Price',
            cs: 'Celková cena',
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
      ]
    },
    createdBy
  ],
}

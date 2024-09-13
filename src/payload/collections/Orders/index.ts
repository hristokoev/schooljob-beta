import { CollectionConfig } from 'payload'

import { cs, en } from '@/translations'
import { SA, SA_A_O, SA_A_O_Self_createdBy } from '@/payload/access'
import { createdBy } from '@/payload/fields'
import { currencyOptions } from '@/payload/data'
import { populateCreatedBy } from '@/payload/hooks'
import { populateGlobalsDataOrders } from './hooks/populateGlobalsDataOrders'
import { populateOrder } from './hooks/populateOrder'
import { populateOrderId } from './hooks/populateOrderId'

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
    useAsTitle: 'orderId',
    defaultColumns: ['orderId', 'organization', 'membership', 'price', 'currency', 'createdAt'],
  },
  access: {
    create: SA_A_O,
    read: SA_A_O_Self_createdBy,
    update: SA,
    delete: SA,
  },
  hooks: {
    beforeChange: [populateCreatedBy, populateOrder, populateOrderId],
    afterChange: [populateGlobalsDataOrders],
    // afterChange: [updateOrganizationJobsAllowed],
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
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'count',
          label: {
            en: 'Count',
            cs: 'Počet',
          },
          type: 'number',
          admin: {
            width: '50%',
          },
          required: true,
        },
      ],
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
            condition: data => data?.price,
          },
          access: {
            create: SA
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
          options: currencyOptions.map(option => ({
            label: {
              en: en.search.options[option as keyof typeof en.search.options],
              cs: cs.search.options[option as keyof typeof cs.search.options],
            },
            value: option,
          })),
          admin: {
            width: '50%',
            condition: data => data?.currency,
          },
          access: {
            create: SA
          },
          required: true,
        },
      ],
    },
    {
      name: 'jobs',
      type: 'relationship',
      relationTo: 'jobs',
      access: {
        create: SA
      },
      admin: {
        condition: data => data?.jobs,
      },
      hasMany: true,
    },
    {
      name: 'jobsAllowed',
      type: 'number',
      access: {
        create: SA
      },
      admin: {
        condition: data => data?.jobsAllowed,
      },
      required: true
    },
    createdBy,
    {
      name: 'orderId',
      label: {
        en: 'Order ID',
        cs: 'ID objednávky',
      },
      type: 'text',
      access: {
        create: SA,
        read: () => true,
        update: SA,
      },
      admin: {
        position: 'sidebar',
        condition: data => data?.orderId,
      },
    }
  ],
}

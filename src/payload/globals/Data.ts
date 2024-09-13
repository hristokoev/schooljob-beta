import type { GlobalConfig } from 'payload'

import { SA } from '@/payload/access'

export const Data: GlobalConfig = {
  slug: 'data',
  typescript: {
    interface: 'Data',
  },
  admin: {
    hidden: ({ user }) => user?.role !== 'super-admin',
  },
  graphQL: {
    name: 'Data',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'lastPublicJobId',
          type: 'number',
          label: {
            en: 'Last Public Job ID',
            cs: 'Poslední ID veřejného otevřeného volného místa',
          },
          defaultValue: 10000,
          access: {
            read: () => true,
            update: SA,
          },
          admin: {
            width: '25%',
          },
        },
        {
          name: 'lastApplicationTrackingId',
          type: 'number',
          label: {
            en: 'Last Application Tracking ID',
            cs: 'Poslední ID sledování žádosti',
          },
          defaultValue: 10000,
          access: {
            read: () => true,
            update: SA,
          },
          admin: {
            width: '25%',
          },
        },
        {
          name: 'dailyOrders',
          type: 'number',
          label: {
            en: 'Daily Orders',
            cs: 'Denní objednávky',
          },
          defaultValue: 0,
          access: {
            read: () => true,
            update: SA,
          },
          admin: {
            width: '25%',
          },
        },
      ],
    },
  ],
}

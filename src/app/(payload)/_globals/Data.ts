import type { GlobalConfig } from 'payload'

export const Data: GlobalConfig = {
  slug: 'data',
  typescript: {
    interface: 'Data',
  },
  admin: {
    hidden: ({ user }) => user?.role !== 'super-admin'
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
          label: 'Last Public Job ID',
          defaultValue: 10000,
          access: {
            read: () => true,
            update: () => false,
          },
          admin: {
            width: '25%',
          },
        },
        {
          name: 'lastApplicationTrackingId',
          type: 'number',
          label: 'Last Application Tracking ID',
          defaultValue: 10000,
          access: {
            read: () => true,
            update: () => false,
          },
          admin: {
            width: '25%',
          },
        },
      ],
    },
  ],
}

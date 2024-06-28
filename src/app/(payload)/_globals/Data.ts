import type { GlobalConfig } from 'payload'

export const Data: GlobalConfig = {
  slug: 'data',
  admin: {
    hidden: true,
  },
  typescript: {
    interface: 'Data',
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

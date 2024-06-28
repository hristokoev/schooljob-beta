import type { GlobalConfig } from 'payload'

export const Dashboard: GlobalConfig = {
  slug: 'dashboard',
  typescript: {
    interface: 'Dashboard',
  },
  graphQL: {
    name: 'Dashboard',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'invalidIds',
      type: 'json',
    },
  ],
}

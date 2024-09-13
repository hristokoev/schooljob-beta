import { type Field } from 'payload'

import { SA } from '@/payload/access'

export const createdBy: Field = {
  name: 'createdBy',
  type: 'relationship',
  relationTo: 'users',
  maxDepth: 0,
  hasMany: false,
  access: {
    create: SA,
    read: SA,
    update: SA,
  },
  admin: {
    position: 'sidebar',
    condition: (data) => data?.createdBy,
  },
}

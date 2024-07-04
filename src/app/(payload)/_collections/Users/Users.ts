import { CollectionConfig } from 'payload'

import { SA, SA_A_O_Self_C_Self_id, SA_U } from '@/payload/access'
import { createProfile } from './hooks/createProfile'
import { ensureFirstUserIsSuperAdmin } from './hooks/ensureFirstUserIsSuperAdmin'
import { populateCreatedBy } from './hooks/populateCreatedBy'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Payload',
    useAsTitle: 'email',
    defaultColumns: ['email', 'role'],
  },
  auth: true,
  hooks: {
    beforeChange: [createProfile],
    afterChange: [populateCreatedBy],
  },
  access: {
    create: SA_U,
    read: SA_A_O_Self_C_Self_id,
    update: SA_A_O_Self_C_Self_id,
    delete: () => false,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      hasMany: false,
      options: [
        {
          label: 'super-admin',
          value: 'super-admin',
        },
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'organization',
          value: 'organization',
        },
        {
          label: 'candidate',
          value: 'candidate',
        },
      ],
      access: {
        update: SA,
      },
      hooks: {
        beforeChange: [ensureFirstUserIsSuperAdmin],
      },
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    // Virtual fields
    {
      name: 'title',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'firstName',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'profile',
      type: 'relationship',
      relationTo: ['organizations', 'candidates'],
      hasMany: false,
      access: {
        update: SA,
      },
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}

import { CollectionConfig } from 'payload'

import { SA, SA_A_O_Self_C_Self_id, SA_U } from '@/payload/access'
import { createProfile } from './hooks/createProfile'
import { ensureFirstUserIsSuperAdmin } from './hooks/ensureFirstUserIsSuperAdmin'
import { loginAfterCreate } from './hooks/loginAfterCreate'
import { populateCreatedBy } from './hooks/populateCreatedBy'
import { SA_A_role } from './access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Payload',
    useAsTitle: 'email',
    defaultColumns: ['email', 'role'],
    hidden: ({ user }) => user?.role !== 'super-admin',
  },
  auth: true,
  hooks: {
    beforeChange: [createProfile],
    afterChange: [loginAfterCreate, populateCreatedBy],
  },
  access: {
    create: SA_U,
    read: SA_A_O_Self_C_Self_id,
    update: SA_A_O_Self_C_Self_id,
    delete: SA_A_role,
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
      access: {
        create: SA,
      },
      admin: {
        position: 'sidebar',
        condition: (data) => data.role === 'organization' && !data?.profile,
      },
    },
    {
      name: 'firstName',
      type: 'text',
      access: {
        create: SA,
      },
      admin: {
        position: 'sidebar',
        condition: (data) => data.role === 'candidate' && !data?.profile,
      },
    },
    {
      name: 'lastName',
      type: 'text',
      access: {
        create: SA,
      },
      admin: {
        position: 'sidebar',
        condition: (data) => data.role === 'candidate' && !data?.profile,
      },
    },
    {
      name: 'profile',
      type: 'relationship',
      relationTo: ['organizations', 'candidates'],
      hasMany: false,
      access: {
        create: () => false,
        update: SA,
      },
      admin: {
        position: 'sidebar',
        condition: (data) => Boolean(data?.profile),
      },
    },
  ],
  timestamps: true,
}

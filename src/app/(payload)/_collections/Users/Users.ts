import { CollectionConfig } from 'payload'

import { SA, SA_A_O_Self_C_Self_id, SA_U } from '@/payload/access'
import { createProfile } from './hooks/createProfile'
import { ensureFirstUserIsSuperAdmin } from './hooks/ensureFirstUserIsSuperAdmin'
import { populateCreatedBy } from './hooks/populateCreatedBy'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: {
      en: 'User',
      cs: 'Uživatel',
    },
    plural: {
      en: 'Users',
      cs: 'Uživatelé',
    },
  },
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
    delete: SA,
    // admin: ({ req: { user } }) => user?.role === 'super-admin' || user?.role === 'admin',
  },
  fields: [
    {
      name: 'role',
      label: {
        en: 'Role',
        cs: 'Role',
      },
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
      label: {
        en: 'Title',
        cs: 'Název',
      },
      type: 'text',
      admin: {
        position: 'sidebar',
        condition: (doc) => doc.role === 'organization',
      },
    },
    {
      name: 'firstName',
      label: {
        en: 'First name',
        cs: 'Jméno',
      },
      type: 'text',
      admin: {
        position: 'sidebar',
        condition: (doc) => doc.role === 'candidate',
      },
    },
    {
      name: 'lastName',
      label: {
        en: 'Last name',
        cs: 'Příjmení',
      },
      type: 'text',
      admin: {
        position: 'sidebar',
        condition: (doc) => doc.role === 'candidate',
      },
    },
    {
      name: 'profile',
      label: {
        en: 'Profile',
        cs: 'Profil',
      },
      type: 'relationship',
      relationTo: ['organizations', 'candidates'],
      hasMany: false,
      access: {
        create: () => false,
        update: () => false,
      },
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}

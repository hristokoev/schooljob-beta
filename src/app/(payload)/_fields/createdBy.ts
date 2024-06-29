import { type Field } from 'payload'

import { SA } from '@/payload/access'

export const createdBy: Field = {
    name: 'createdBy',
    type: 'relationship',
    relationTo: 'users',
    hasMany: false,
    access: {
        read: SA,
        update: SA,
    },
    admin: {
        readOnly: true,
        position: 'sidebar',
    },
}

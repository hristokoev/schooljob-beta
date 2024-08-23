import { type Field } from 'payload'

import { SA } from '@/payload/access'

export const createdBy: Field = {
    name: 'createdBy',
    type: 'relationship',
    relationTo: 'users',
    maxDepth: 0,
    hasMany: false,
    access: {
        read: SA,
        update: () => false,
    },
    admin: {
        position: 'sidebar',
    },
}

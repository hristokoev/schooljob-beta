import type { Field } from 'payload'

import { SA } from '@/payload/access'
import { formatSlug } from './hooks/formatSlug'

type Slug = () => Field

export const slugField: Slug = () => {
  return {
    name: 'slug',
    label: 'Slug',
    type: 'text',
    index: true,
    hooks: {
      beforeValidate: [formatSlug],
    },
    access: {
      update: SA,
    },
    admin: {
      position: 'sidebar',
    }
  }
}

import type { Field } from 'payload'

import { SA } from '@/payload/access'
import { formatSlug } from './hooks/formatSlug'

const slugField: Field = {
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

export { slugField }

import type { Field } from 'payload'

import { formatSlug } from './hooks/formatSlug'
import { SA } from '@/payload/access'

const slugField: Field = {
  name: 'slug',
  label: {
    en: 'Slug',
    cs: 'Slug',
  },
  type: 'text',
  index: true,
  hooks: {
    beforeValidate: [formatSlug],
  },
  access: {
    create: SA,
    update: SA,
  },
  admin: {
    position: 'sidebar',
    condition: (data) => data?.slug,
  }
}

export { slugField }

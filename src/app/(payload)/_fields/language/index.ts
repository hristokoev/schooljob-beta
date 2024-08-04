import { type Field } from 'payload'

import { ARCHIVED } from '@/payload/access'
import { languageOptions } from '@/payload/data'

export const languageField: Field = {
  name: 'language',
  type: 'select',
  options: languageOptions,
  hasMany: true,
  access: {
    read: ARCHIVED,
  },
}

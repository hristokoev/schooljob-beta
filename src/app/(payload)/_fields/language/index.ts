import { type Field } from 'payload'

import { languageOptions } from '@/payload/data'
import { ARCHIVED } from '@/payload/access'

export const languageField: Field = {
  name: 'language',
  type: 'select',
  options: languageOptions,
  hasMany: true,
  access: {
    read: ARCHIVED,
  },
}

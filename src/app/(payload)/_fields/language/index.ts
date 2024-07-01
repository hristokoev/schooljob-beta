import { type Field } from 'payload'

import { languageOptions } from '@/payload/data'

export const languageField: Field = {
  name: 'language',
  type: 'select',
  options: languageOptions,
  hasMany: true,
}

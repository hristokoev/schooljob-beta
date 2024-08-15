import { type Field } from 'payload'

import { cs, en } from '@/translations'
import { ARCHIVED } from '@/payload/access'
import { languageOptions } from '@/payload/data'

export const languageField: Field = {
  name: 'language',
  type: 'select',
  options: languageOptions.map(option => ({
    label: {
      en: en.search.options[option as keyof typeof en.search.options],
      cs: cs.search.options[option as keyof typeof cs.search.options],
    },
    value: option,
  })),
  hasMany: true,
  access: {
    read: ARCHIVED,
  },
}

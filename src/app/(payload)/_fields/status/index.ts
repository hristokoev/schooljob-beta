import { Field } from 'payload'

import { ARCHIVED, SA_A } from '@/payload/access'
import { StatusSelectCell } from './cell'
import { StatusSelectField } from './field'

export const statusField: Field = {
  name: 'status',
  label: 'Status',
  type: 'text',
  admin: {
    components: {
      Field: StatusSelectField,
      Cell: StatusSelectCell,
    },
  },
  access: {
    create: SA_A,
    read: ARCHIVED,
    update: SA_A,
  },
  defaultValue: 'unpublished',
  required: true,
}

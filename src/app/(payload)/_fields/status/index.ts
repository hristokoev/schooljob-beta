import { Field } from 'payload'

import { SA_A } from '@/payload/access'
import { StatusSelectComponentCell } from './cell'
import { StatusSelectComponentField } from './field'

export const statusField: Field = {
  name: 'status',
  label: 'Status',
  type: 'text',
  admin: {
    components: {
      Field: StatusSelectComponentField,
      Cell: StatusSelectComponentCell,
    },
  },
  access: {
    create: SA_A,
    update: SA_A,
  },
  defaultValue: 'unpublished',
  required: true,
}

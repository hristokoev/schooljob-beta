import { Field } from 'payload'

import { ARCHIVED, SA_A } from '@/payload/access'
import { SA_A_O_jobsAllowed } from '@/payload/collections/Jobs/access/SA_A_O_jobsAllowed'
import { StatusSelectCell } from './cell'
import { StatusSelectField } from './field'

export const statusField: Field = {
  name: 'status',
  label: {
    en: 'Status',
    cs: 'Stav',
  },
  type: 'select',
  options: [
    {
      label: {
        en: 'Published',
        cs: 'Publikováno',
      },
      value: 'published',
    },
    {
      label: {
        en: 'Unpublished',
        cs: 'Nepublikováno',
      },
      value: 'unpublished',
    },
    {
      label: {
        en: 'Expired',
        cs: 'Vypršelo',
      },
      value: 'expired',
    }
  ],
  admin: {
    components: {
      Field: StatusSelectField,
      Cell: StatusSelectCell,
    },
  },
  access: {
    create: SA_A_O_jobsAllowed,
    read: ARCHIVED,
    update: SA_A,
  },
  defaultValue: 'unpublished',
  required: true,
}

import { Field } from 'payload'

import { SA_A } from '@/payload/access'
import { SA_O_jobsAllowed } from '@/payload/collections/Jobs/access/SA_O_jobsAllowed'

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
      Cell: 'src/payload/fields/status/cell.tsx#StatusSelectCell',
      Field: 'src/payload/fields/status/field.tsx#StatusSelectField',
    },
  },
  access: {
    create: SA_O_jobsAllowed,
    update: SA_A,
  },
  defaultValue: 'unpublished',
  required: true,
}

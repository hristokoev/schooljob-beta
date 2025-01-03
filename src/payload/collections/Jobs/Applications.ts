import { CollectionConfig, User } from 'payload'

import { cs, en } from '@/translations'
import { SA, SA_A_O, SA_C, SA_C_U } from '@/payload/access'
import { applicationStatusOptions } from '@/payload/data'
import { archived } from '@/payload/fields'
import { dispatchEvents } from '@/payload/hooks'
import { populateCandidateApplications } from './hooks/populateCandidateApplications'
import { populateCv } from './hooks/populateCv'
import { populateGlobalsDataApplications } from './hooks/populateGlobalsData'
import { populateJobApplications } from './hooks/populateJobApplications'
import { populateTrackingId } from './hooks/populateTrackingId'
import { preventMultipleApplications } from './hooks/preventMultipleApplications'
import SA_A_O_Some from './access/SA_A_O_Some'
import SA_A_O_Some_C_Self from './access/SA_A_O_Some_C_Self'

export const Applications: CollectionConfig = {
  slug: 'applications',
  labels: {
    singular: {
      en: 'Application',
      cs: 'Žádost',
    },
    plural: {
      en: 'Applications',
      cs: 'Žádosti',
    },
  },
  admin: {
    group: {
      en: 'Main',
      cs: 'Hlavní',
    },
    useAsTitle: `fullName`,
    components: {
      beforeListTable: ['src/payload/components/Archived/index.tsx#Archived'],
    },
    defaultColumns: ['firstName', 'lastName', 'job', 'status', 'archived'],
  },
  access: {
    create: SA_C_U,
    read: SA_A_O_Some_C_Self,
    update: SA_A_O_Some,
    delete: SA,
  },
  hooks: {
    beforeValidate: [preventMultipleApplications],
    beforeChange: [populateTrackingId],
    afterChange: [
      dispatchEvents([
        {
          operation: 'create',
          event: 'new-application',
        },
      ]),
      populateGlobalsDataApplications,
      populateCv,
      populateCandidateApplications,
      populateJobApplications,
    ],
  },
  fields: [
    archived,
    {
      type: 'row',
      fields: [
        {
          name: 'job',
          label: {
            en: 'Job',
            cs: 'Inzerát',
          },
          type: 'relationship',
          relationTo: 'jobs',
          hasMany: false,
          admin: {
            width: '50%',
          },
          access: {
            update: SA,
          },
          required: true,
        },
        {
          name: 'candidate',
          label: {
            en: 'Candidate',
            cs: 'Kandidát',
          },
          type: 'relationship',
          relationTo: 'candidates',
          hasMany: false,
          admin: {
            width: '50%',
            condition: data => data?.candidate,
          },
          access: {
            create: SA_C,
            update: SA,
          },
          defaultValue: ({ user }: { user: User }) => {
            if (user?.role === 'candidate') {
              return user.profile.value.id
            }
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          label: {
            en: 'First Name',
            cs: 'Jméno',
          },
          type: 'text',
          admin: {
            width: '50%',
            condition: data => !data?.candidate,
          },
          access: {
            update: SA,
          },
          defaultValue: ({ user }: { user: User }) => {
            if (user?.role === 'candidate') {
              return user.profile.value.firstName
            }
          },
          required: true,
        },
        {
          name: 'lastName',
          label: {
            en: 'Last Name',
            cs: 'Příjmení',
          },
          type: 'text',
          admin: {
            width: '50%',
            condition: data => !data?.candidate,
          },
          access: {
            update: SA,
          },
          defaultValue: ({ user }: { user: User }) => {
            if (user?.role === 'candidate') {
              return user.profile.value.lastName
            }
          },
          required: true,
        },
      ],
      admin: {
        condition: data => !data?.candidate,
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          label: {
            en: 'Email',
            cs: 'Email',
          },
          type: 'text',
          admin: {
            width: '50%',
          },
          access: {
            update: SA,
          },
          required: true,
        },
        {
          name: 'phone',
          label: {
            en: 'Phone',
            cs: 'Telefon',
          },
          type: 'text',
          admin: {
            width: '50%',
            condition: data => !data?.candidate,
          },
          access: {
            update: SA,
          },
          defaultValue: ({ user }: { user: User }) => {
            if (user?.role === 'candidate') {
              return user.profile.value.phone ? user.profile.value.phone : ''
            }
          },
        },
      ],
      admin: {
        condition: data => !data?.candidate,
      },
    },
    {
      name: 'location',
      label: {
        en: 'Location',
        cs: 'Místo',
      },
      type: 'text',
      access: {
        update: SA,
      },
      admin: {
        condition: data => !data?.candidate,
      },
      defaultValue: ({ user }: { user: User }) => {
        if (user?.role === 'candidate') {
          return user.profile.value.location ? user.profile.value.location : ''
        }
      },
    },
    {
      name: 'coverLetter',
      label: {
        en: 'Cover Letter',
        cs: 'Představení',
      },
      type: 'textarea',
      access: {
        update: SA,
      },
    },
    {
      name: 'cv',
      label: {
        en: 'CV',
        cs: 'CV',
      },
      type: 'upload',
      relationTo: 'cvs',
      access: {
        update: SA,
      },
      required: true,
    },
    {
      name: 'processingOfPersonalData',
      label: {
        en: 'Processing of Personal Data',
        cs: 'Zpracování osobních údajů',
      },
      type: 'checkbox',
      access: {
        update: SA,
      },
      required: true,
    },
    // Sidebar fields
    {
      name: 'status',
      label: {
        en: 'Status',
        cs: 'Stav',
      },
      type: 'select',
      defaultValue: 'pending',
      options: applicationStatusOptions.map(option => ({
        label: {
          en: en.search.options[option as keyof typeof en.search.options],
          cs: cs.search.options[option as keyof typeof cs.search.options],
        },
        value: option,
      })),
      admin: {
        position: 'sidebar',
      },
      access: {
        create: SA,
        update: SA_A_O,
      },
      required: true,
    },
    {
      name: 'fullName',
      label: {
        en: 'Full Name',
        cs: 'Celé jméno',
      },
      type: 'text',
      admin: {
        hidden: true, // hides the field from the admin panel
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // ensures data is not stored in DB
            delete siblingData['fullName']
          },
        ],
        afterRead: [
          ({ data }) => {
            return `${data?.firstName} ${data?.lastName}`
          },
        ],
      },
    },
    {
      name: 'trackingId',
      label: {
        en: 'Tracking ID',
        cs: 'Tracking ID',
      },
      type: 'number',
      access: {
        read: () => true,
        update: SA,
      },
      admin: {
        position: 'sidebar',
        condition: data => Boolean(data?.trackingId),
      },
    },
  ],
}

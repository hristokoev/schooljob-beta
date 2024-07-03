import { CollectionConfig, User } from 'payload'

import { ARCHIVED, SA, SA_A, SA_A_O, SA_C, SA_C_U } from '@/payload/access'
import { applicationStatusOptions } from '@/payload/data'
import { cleanupCandidateAfterApplicationDelete } from './hooks/cleanupCandidateAfterApplicationDelete'
import { cleanupJobAfterApplicationDelete } from './hooks/cleanupJobAfterApplicationDelete'
import { populateCandidateApplications } from './hooks/populateCandidateApplications'
import { populateCv } from './hooks/populateCv'
import { populateGlobalsDataApplications } from './hooks/populateGlobalsData'
import { populateJobApplications } from './hooks/populateJobApplications'
import { populateTrackingId } from './hooks/populateTrackingId'
import { preventMultipleApplications } from './hooks/preventMultipleApplications'
import SA_A_O_Some from './access/SA_A_O_Some'
import SA_A_O_Some_C_Self from './access/SA_A_O_Some_C_Self'
import { archived } from '@/payload/fields'
// import { StatusSelectComponentCell } from '../../fields/status/cell'

export const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    group: 'SchoolJob',
    useAsTitle: `fullName`,
    defaultColumns: ['candidate', 'job', 'status'],
  },
  access: {
    create: SA_C_U,
    read: SA_A_O_Some_C_Self,
    update: SA_A_O_Some,
    delete: () => false,
  },
  hooks: {
    beforeValidate: [preventMultipleApplications],
    beforeChange: [populateTrackingId],
    afterChange: [
      populateGlobalsDataApplications,
      populateCv,
      populateCandidateApplications,
      populateJobApplications,
    ],
    afterDelete: [cleanupJobAfterApplicationDelete, cleanupCandidateAfterApplicationDelete],
  },
  fields: [
    archived,
    {
      type: 'row',
      fields: [
        {
          name: 'job',
          type: 'relationship',
          relationTo: 'jobs',
          hasMany: false,
          admin: {
            width: '50%',
          },
          access: {
            read: ARCHIVED,
            update: SA,
          },
          required: true,
        },
        {
          name: 'candidate',
          type: 'relationship',
          relationTo: 'candidates',
          hasMany: false,
          admin: {
            width: '50%',
            readOnly: true,
            condition: (data) => data?.candidate,
          },
          access: {
            create: SA_C,
            read: ARCHIVED,
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
          label: 'First Name',
          type: 'text',
          admin: {
            width: '50%',
            condition: (data) => !data?.candidate,
          },
          access: {
            read: ARCHIVED,
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
          label: 'Last Name',
          type: 'text',
          admin: {
            width: '50%',
            condition: (data) => !data?.candidate,
          },
          access: {
            read: ARCHIVED,
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
        condition: (data) => !data?.candidate,
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          admin: {
            width: '50%',
            condition: (data) => !data?.candidate,
          },
          access: {
            read: ARCHIVED,
            update: SA,
          },
          defaultValue: ({ user }: { user: User }) => {
            if (user?.role === 'candidate') {
              return user.profile.value.email
            }
          },
          required: true,
        },
        {
          name: 'phone',
          label: 'Phone',
          type: 'text',
          admin: {
            width: '50%',
            condition: (data) => !data?.candidate,
          },
          access: {
            read: ARCHIVED,
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
        condition: (data) => !data?.candidate,
      },
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      access: {
        read: ARCHIVED,
        update: SA,
      },
      admin: {
        condition: (data) => !data?.candidate,
      },
      defaultValue: ({ user }: { user: User }) => {
        if (user?.role === 'candidate') {
          return user.profile.value.location ? user.profile.value.location : ''
        }
      },
    },
    {
      name: 'coverLetter',
      type: 'textarea',
      access: {
        read: ARCHIVED,
        update: SA,
      },
    },
    {
      name: 'cv',
      label: 'CV',
      type: 'upload',
      relationTo: 'cvs',
      access: {
        read: ARCHIVED,
        update: SA,
      },
      required: true,
    },
    {
      name: 'agreements',
      type: 'relationship',
      relationTo: 'agreements',
      hasMany: true,
      access: {
        read: ARCHIVED,
        update: SA_C,
      },
    },
    // Sidebar fields
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: applicationStatusOptions,
      admin: {
        position: 'sidebar',
        components: {
          // Cell: StatusSelectComponentCell
        },
      },
      access: {
        create: SA,
        read: ARCHIVED,
        update: SA_A_O,
      },
      required: true,
    },
    {
      name: 'fullName',
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
      access: {
        read: ARCHIVED,
      }
    },
    {
      name: 'trackingId',
      type: 'number',
      access: {
        read: () => true,
        update: () => false,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: (data) => Boolean(data?.trackingId),
      },
    },
  ],
}

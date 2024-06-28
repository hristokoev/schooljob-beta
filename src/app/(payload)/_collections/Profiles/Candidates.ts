import { CollectionConfig } from 'payload'

import { SA, SA_A, SA_A_C_Self_createdBy, SA_C } from '@/payload/access'
import SA_A_O_C_Self from './access/SA_A_O_C_Self'

export const Candidates: CollectionConfig = {
  slug: 'candidates',
  admin: {
    group: 'SchoolJob',
    useAsTitle: 'fullName',
    defaultColumns: ['firstName', 'lastName', 'email', 'phone', 'location'],
    hidden: ({ user }) => user?.role === 'organization' || user?.role === 'candidate',
  },
  access: {
    /*
      Only users with the 'super-admin' role can create candidates.
      However, candidates are usually created from the frontend, i.e. anonymously.
      This is happening in the 'createProfile' hook in the Users collection, which
      is triggered when a new user is created. Even though only 'super-admin' users can
      create candidates, the Local API has overrideAccess set to true.
    */
    create: SA,
    read: SA_A_O_C_Self,
    update: SA_A_C_Self_createdBy,
    delete: SA_A,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Candidate Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'firstName',
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                  required: true,
                },
                {
                  name: 'lastName',
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                  required: true,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'email',
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                  unique: true,
                  required: true,
                },
                {
                  name: 'phone',
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'location',
              type: 'text',
            },
            {
              name: 'photo',
              type: 'upload',
              relationTo: 'site-uploads',
            },
            {
              name: 'bio',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Applications & Saved Jobs',
          fields: [
            {
              name: 'applications',
              type: 'relationship',
              relationTo: 'applications',
              hasMany: true,
              access: {
                update: SA,
              },
            },
            {
              name: 'jobsSaved',
              type: 'relationship',
              relationTo: 'jobs',
              hasMany: true,
              access: {
                update: SA_C,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      access: {
        read: SA,
        update: SA,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: (data) => Boolean(data?.createdBy),
      },
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
    },
  ],
}

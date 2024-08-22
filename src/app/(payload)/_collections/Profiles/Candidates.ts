import { CollectionConfig } from 'payload'

import { ARCHIVED, SA, SA_A_C_Self_createdBy } from '@/payload/access'
import { archived, createdBy } from '@/payload/fields'
import { Archived } from '@/payload/components'
import { dispatchEvents } from '@/payload/hooks'
import SA_A_O_C_Self from './access/SA_A_O_C_Self'

export const Candidates: CollectionConfig = {
  slug: 'candidates',
  labels: {
    singular: {
      en: 'Candidate',
      cs: 'Profil kandidáta',
    },
    plural: {
      en: 'Candidates',
      cs: 'Profily kandidátů',
    },
  },
  admin: {
    group: {
      en: 'Profiles',
      cs: 'Profily',
    },
    useAsTitle: 'fullName',
    defaultColumns: ['firstName', 'lastName', 'email', 'phone', 'location', 'archived'],
    components: {
      BeforeListTable: [Archived],
    },
    hidden: ({ user }) => user?.role === 'organization' || user?.role === 'candidate',
  },
  hooks: {
    afterChange: [
      dispatchEvents([
        {
          operation: 'create',
          event: 'new-candidate',
        },
      ]),
    ]
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
    delete: SA,
  },
  fields: [
    archived,
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Candidate Details',
            cs: 'Detaily kandidáta',
          },
          fields: [
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
                  },
                  access: {
                    read: ARCHIVED
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
                  },
                  access: {
                    read: ARCHIVED
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
                  label: {
                    en: 'Email',
                    cs: 'Email',
                  },
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                  unique: true,
                  access: {
                    read: ARCHIVED
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
                  },
                  access: {
                    read: ARCHIVED
                  }
                },
              ],
            },
            {
              name: 'location',
              label: {
                en: 'Location',
                cs: 'Místo',
              },
              type: 'text',
              access: {
                read: ARCHIVED
              }
            },
            {
              name: 'photo',
              label: {
                en: 'Photo',
                cs: 'Fotka',
              },
              type: 'upload',
              relationTo: 'photos',
              access: {
                read: ARCHIVED,
              }
            },
            {
              name: 'bio',
              label: {
                en: 'Bio',
                cs: 'Bio',
              },
              type: 'textarea',
              access: {
                read: ARCHIVED
              }
            },
          ],
        },
        {
          label: {
            en: 'Applications',
            cs: 'Žádosti',
          },
          fields: [
            {
              name: 'applications',
              label: {
                en: 'Applications',
                cs: 'Žádosti',
              },
              type: 'relationship',
              relationTo: 'applications',
              hasMany: true,
              access: {
                update: () => false
              }
            },
          ],
        },
        {
          label: {
            en: 'Saved Jobs',
            cs: 'Uložené pozice',
          },
          fields: [
            {
              name: 'jobsSaved',
              label: {
                en: 'Saved Jobs',
                cs: 'Uložené pozice',
              },
              type: 'relationship',
              relationTo: 'jobs',
              hasMany: true,
              admin: {
                readOnly: true,
              }
            },
          ],
        }
      ],
    },
    createdBy,
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
      access: {
        read: ARCHIVED
      }
    },
  ],
}

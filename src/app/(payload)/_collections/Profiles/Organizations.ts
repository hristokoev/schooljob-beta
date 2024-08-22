import { CollectionConfig } from 'payload'

import { ARCHIVED, SA, SA_A, SA_A_O_Self_createdBy } from '@/payload/access'
import { archived, slugField } from '@/payload/fields'
import { categoriesOptions, cz } from '@/payload/data'
import { cs, en } from '@/translations'
import { Archived } from '@/payload/components'
import { createdBy } from '@/payload/fields'
import { dispatchEvents } from '@/payload/hooks'

export const Organizations: CollectionConfig = {
  slug: 'organizations',
  labels: {
    singular: {
      en: 'Organization',
      cs: 'Profil organizace',
    },
    plural: {
      en: 'Organizations',
      cs: 'Profily organizací',
    },
  },
  admin: {
    group: {
      en: 'Profiles',
      cs: 'Profily',
    },
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'archived'],
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
          event: 'new-organization',
        },
      ]),
    ]
  },
  access: {
    /*
      Only users with the 'super-admin' role can create organizations.
      However, organizations are usually created from the frontend, i.e. anonymously.
      This is happening in the 'createProfile' hook in the Users collection, which
      is triggered when a new user is created. Even though only 'super-admin' users can
      create organization, the Local API has overrideAccess set to true.
    */
    create: SA,
    read: ({ req: { user } }) => {
      if (user?.role === 'super-admin') {
        return true
      }

      return {
        archived: {
          equals: false
        }
      }
    },
    update: SA_A_O_Self_createdBy,
    delete: SA,
  },
  fields: [
    archived,
    {
      name: 'title',
      label: {
        en: 'Title',
        cs: 'Název',
      },
      type: 'text',
      required: true,
      access: {
        update: SA_A,
      },
    },
    slugField,
    {
      name: 'featured',
      label: {
        en: 'Featured',
        cs: 'Zvýrazněno ⭐',
      },
      type: 'checkbox',
      defaultValue: false,
      admin: {
        components: {
          Cell: ({ cellData }) => {
            return cellData ? 'Yes' : 'No'
          },
        },
      },
      access: {
        create: SA_A,
        read: ARCHIVED,
        update: SA_A,
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Organization Details',
            cs: 'Detaily organizace'
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  access: {
                    read: ARCHIVED
                  },
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
                  required: true,
                },
                {
                  access: {
                    read: ARCHIVED
                  },
                  name: 'phone',
                  label: {
                    en: 'Phone',
                    cs: 'Telefon',
                  },
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  access: {
                    read: ARCHIVED
                  },
                  name: 'location',
                  label: {
                    en: 'Location',
                    cs: 'Lokalita',
                  },
                  type: 'select',
                  hasMany: true,
                  options: cz,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  access: {
                    read: ARCHIVED
                  },
                  name: 'vatId',
                  label: {
                    en: 'VAT ID',
                    cs: 'IČO',
                  },
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              access: {
                read: ARCHIVED
              },
              name: 'categories',
              label: {
                en: 'Categories',
                cs: 'Kategorie',
              },
              type: 'select',
              options: categoriesOptions.map(option => ({
                label: {
                  en: en.search.options[option as keyof typeof en.search.options],
                  cs: cs.search.options[option as keyof typeof cs.search.options],
                },
                value: option,
              })),
              hasMany: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'logo',
                  label: {
                    en: 'Logo',
                    cs: 'Logo',
                  },
                  type: 'upload',
                  relationTo: 'logos',
                  admin: {
                    description: 'Logo of the organization. The filename will be autogenerated.',
                    width: '50%',
                  },
                  access: {
                    read: ARCHIVED,
                  },
                },
                {
                  name: 'imageCover',
                  label: {
                    en: 'Image Cover',
                    cs: 'Obrázek',
                  },
                  type: 'upload',
                  relationTo: 'image-covers',
                  admin: {
                    width: '50%',
                  },
                  access: {
                    read: ARCHIVED,
                  },
                },
              ],
            },
            {
              access: {
                read: ARCHIVED
              },
              name: 'description',
              label: {
                en: 'Description',
                cs: 'Popis',
              },
              type: 'textarea',
            },
            {
              access: {
                read: ARCHIVED
              },
              name: 'richText',
              label: {
                en: 'Rich Text',
                cs: 'Celý popis',
              },
              type: 'richText',
            },
            {
              access: {
                read: ARCHIVED
              },
              name: 'url',
              label: {
                en: 'URL',
                cs: 'Odkaz',
              },
              type: 'text',
            },
          ],
        },
        {
          label: {
            en: 'Published Jobs',
            cs: 'Publikované inzeráty',
          },
          fields: [
            {
              name: 'jobsPublished',
              label: {
                en: 'Published Jobs',
                cs: 'Publikované inzeráty',
              },
              type: 'relationship',
              relationTo: 'jobs',
              maxDepth: 0,
              hasMany: true,
              unique: false,
              admin: {
                readOnly: true,
              }
            },
          ],
        },
        {
          label: {
            en: 'Unpublished Jobs',
            cs: 'Koncepty'
          },
          fields: [
            {
              name: 'jobsUnpublished',
              label: {
                en: 'Unpublished Jobs',
                cs: 'Koncepty',
              },
              type: 'relationship',
              relationTo: 'jobs',
              maxDepth: 0,
              hasMany: true,
              unique: false,
              admin: {
                readOnly: true,
              }
            },
          ],
        },
        {
          label: {
            en: 'Membership Custom Options',
            cs: 'Vlastní možnosti členství',
          },
          fields: [
            {
              name: 'jobsAllowed',
              label: {
                en: 'Number of remaining jobs',
                cs: 'Počet zbývajících inzerátů',
              },
              type: 'number',
              defaultValue: 0,
              access: {
                read: ARCHIVED,
                update: SA_A
              },
              required: true,
            },
            {
              type: 'array',
              name: 'memberships',
              access: {
                read: ARCHIVED,
                update: SA_A,
              },
              fields: [
                {
                  name: 'membership',
                  label: {
                    en: 'Membership',
                    cs: 'Členství',
                  },
                  type: 'relationship',
                  relationTo: 'memberships',
                  access: {
                    read: ARCHIVED,
                    update: SA_A
                  },
                  required: true,

                  unique: true,
                },
                {
                  name: 'price',
                  type: 'number',
                  access: {
                    read: ARCHIVED,
                    update: SA_A
                  },
                  required: true,
                }
              ],
            },
          ]
        }
      ],
    },
    createdBy
  ],
}

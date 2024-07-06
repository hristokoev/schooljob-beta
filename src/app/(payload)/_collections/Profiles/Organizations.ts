import { CollectionConfig } from 'payload'

import { ARCHIVED, SA, SA_A, SA_A_O_Self_createdBy } from '@/payload/access'
import { createdBy } from '@/payload/fields'
import { revalidateOrganizationAfterChange } from './hooks/revalidateOrganizationAfterChange'
import { archived, slugField } from '@/payload/fields'
import { categoriesOptions } from '@/payload/data'
import { Archived } from '@/payload/components'

export const Organizations: CollectionConfig = {
  slug: 'organizations',
  admin: {
    group: 'SchoolJob',
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'archived'],
    components: {
      BeforeListTable: [Archived],
    }
    // hidden: ({ user }) => user?.role === 'organization' || user?.role === 'candidate',
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
  hooks: {
    afterChange: [revalidateOrganizationAfterChange],
  },
  fields: [
    archived,
    {
      name: 'title',
      type: 'text',
      required: true,
      access: {
        update: SA_A,
      },
    },
    slugField,
    {
      name: 'featured',
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
          label: 'Organization Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  access: {
                    read: ARCHIVED
                  },
                  name: 'email',
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
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  access: {
                    read: ARCHIVED
                  },
                  name: 'vatId',
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
              type: 'select',
              options: categoriesOptions,
              hasMany: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'site-uploads',
                  admin: {
                    description: 'Logo of the organization. The filename will be autogenerated.',
                    width: '50%',
                  },
                  access: {
                    read: ARCHIVED,
                    update: () => false
                  },
                },
                {
                  name: 'imageCover',
                  type: 'upload',
                  relationTo: 'site-uploads',
                  admin: {
                    width: '50%',
                  },
                  access: {
                    read: ARCHIVED,
                    update: () => false
                  },
                },
              ],
            },
            {
              access: {
                read: ARCHIVED
              },
              name: 'description',
              type: 'textarea',
            },
            {
              access: {
                read: ARCHIVED
              },
              name: 'richText',
              type: 'richText',
            },
            {
              access: {
                read: ARCHIVED
              },
              name: 'url',
              type: 'text',
            },
          ],
        },
        {
          label: 'Published Jobs',
          fields: [
            {
              name: 'jobsPublished',
              type: 'relationship',
              relationTo: 'jobs',
              maxDepth: 0,
              hasMany: true,
              unique: false,
              access: {
                update: () => false,
              },
            },
          ],
        },
        {
          label: 'Unpublished Jobs',
          fields: [
            {
              name: 'jobsUnpublished',
              type: 'relationship',
              relationTo: 'jobs',
              maxDepth: 0,
              hasMany: true,
              unique: false,
              access: {
                update: () => false,
              },
            },
          ],
        },
      ],
    },
    createdBy
  ],
}

import { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { SA, SA_A, SA_A_O_Self_createdBy } from '@/payload/access'
import { revalidateOrganizationAfterChange } from './hooks/revalidateOrganizationAfterChange'
import { revalidateOrganizationAfterDelete } from './hooks/revalidateOrganizationAfterDelete'
import { slugField } from '@/payload/fields'

export const Organizations: CollectionConfig = {
  slug: 'organizations',
  admin: {
    group: 'SchoolJob',
    useAsTitle: 'title',
    defaultColumns: ['title', 'location'],
    hidden: ({ user }) => user?.role === 'organization' || user?.role === 'candidate',
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
    read: () => true,
    update: SA_A_O_Self_createdBy,
    delete: SA_A,
  },
  hooks: {
    afterChange: [revalidateOrganizationAfterChange],
    afterDelete: [revalidateOrganizationAfterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      access: {
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
              type: 'row',
              fields: [
                {
                  name: 'location',
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'vatId',
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
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'site-uploads',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'imageCover',
                  type: 'upload',
                  relationTo: 'site-uploads',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'richText',
              type: 'richText',
              editor: lexicalEditor(),
            },
            {
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
              hasMany: true,
              unique: false,
              access: {
                update: SA,
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
              hasMany: true,
              unique: false,
              access: {
                update: SA,
              },
            },
          ],
        },
      ],
    },
    // Sidebar fields
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        components: {
          Cell: ({ cellData }) => {
            return cellData ? 'Yes' : 'No'
          },
        },
      },
      access: {
        create: SA_A,
        update: SA_A,
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'job-categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
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
  ],
}

import { CollectionConfig } from 'payload'
import { User } from '@payload-types'

import { ARCHIVED, SA, SA_A, SA_A_O, SA_A_O_Self_createdBy, SA_O } from '@/payload/access'
import { archived, slugField } from '@/payload/fields'
import { categoriesOptions, currencyOptions, educationOptions, employmentTypeOptions, experienceOptions, locationTypeOptions, salaryTypeOptions } from '@/payload/data'
import { Archived } from '@/payload/components'
import { createdBy } from '@/payload/fields'
import { FeaturedCell } from '@/payload/cells'
import { languageField } from '@/payload/fields'
import { organizationFilter } from './filters/organizationFilter'
import { populateCreatedBy } from '@/payload/hooks'
import { populateGlobalsDataJobs } from './hooks/populateGlobalsData'
import { populateOrganizationJobs } from './hooks/populateOrganizationJobs'
import { populatePublicId } from './hooks/populatePublicId'
import SA_A_O_Some_U from './access/SA_A_O_Some_U'
import { statusField } from '@/payload/fields'
import { updateOrganizationJobs } from './hooks/updateOrganizationJobs'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    group: 'SchoolJob',
    useAsTitle: 'title',
    defaultColumns: ['title', 'organization', 'featured', 'status', 'archived'],
    components: {
      BeforeListTable: [Archived],
    }
    // hidden: ({ user }) => user?.role === 'candidate',
  },
  hooks: {
    beforeChange: [populateCreatedBy, populatePublicId],
    afterChange: [
      populateGlobalsDataJobs,
      populateOrganizationJobs,
      updateOrganizationJobs,
    ],
  },
  access: {
    create: SA_O,
    read: SA_A_O_Some_U,
    update: SA_A_O_Self_createdBy,
    delete: SA,
  },
  fields: [
    archived,
    statusField,
    {
      name: 'title',
      type: 'text',
      defaultValue: '',
      required: true,
    },
    {
      name: 'categories',
      type: 'select',
      options: categoriesOptions,
      hasMany: true,
      access: {
        read: ARCHIVED,
      },
      required: true,
    },
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations',
      maxDepth: 2,
      hasMany: false,
      filterOptions: organizationFilter,
      access: {
        create: SA_A_O,
        update: () => false,
      },
      defaultValue: ({ user }: { user: User }) => {
        /*
          super-admins can create jobs for any organization
          admins can't create jobs as per colleciton access control
          organizations can create jobs for themselves
        */
        if (user.profile && user?.role === 'organization') {
          return typeof user.profile.value === 'string' ? user.profile.value : user.profile.value.id
        }

        // super-admins
        return undefined
      },
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Job Details',
          fields: [
            {
              name: 'employmentType',
              type: 'select',
              defaultValue: [],
              options: employmentTypeOptions,
              hasMany: true,
              access: {
                read: ARCHIVED,
              },
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'location',
                  type: 'text',
                  defaultValue: '',
                  admin: {
                    width: '50%',
                  },
                  access: {
                    read: ARCHIVED,
                  },
                },
                {
                  name: 'locationType',
                  type: 'select',
                  defaultValue: [],
                  options: locationTypeOptions,
                  hasMany: true,
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
              type: 'row',
              fields: [
                {
                  name: 'education',
                  type: 'select',
                  defaultValue: [],
                  options: educationOptions,
                  admin: {
                    width: '50%',
                  },
                  hasMany: true,
                  access: {
                    read: ARCHIVED,
                  },
                },
                {
                  name: 'experience',
                  type: 'select',
                  defaultValue: [],
                  options: experienceOptions,
                  admin: {
                    width: '50%',
                  },
                  hasMany: true,
                  access: {
                    read: ARCHIVED,
                  },
                },
              ],
            },
            languageField,
            {
              name: 'salary',
              type: 'group',
              fields: [
                {
                  type: 'checkbox',
                  name: 'enabled',
                  defaultValue: false,
                },
                {
                  type: 'checkbox',
                  name: 'range',
                  defaultValue: false,
                  admin: {
                    condition: (data) => Boolean(data?.salary?.enabled),
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'base',
                      type: 'number',
                      defaultValue: 0,
                      admin: {
                        width: '50%',
                        condition: (data) => data?.salary?.enabled && !data?.salary?.range,
                      },
                      validate: (value) => {
                        if (value < 1) {
                          return 'Number must be greater than or equal to 1'
                        }

                        return true
                      },
                      required: true,
                    },
                    {
                      name: 'minSalary',
                      type: 'number',
                      defaultValue: 0,
                      admin: {
                        width: '25%',
                        condition: (data) =>
                          Boolean(data?.salary?.enabled) && Boolean(data?.salary?.range),
                      },
                      validate: (value, { data }) => {
                        if (value > data.salary?.maxSalary) {
                          return 'Minimum salary must be less than maximum salary'
                        }

                        return true
                      },
                      required: true,
                    },
                    {
                      name: 'maxSalary',
                      type: 'number',
                      defaultValue: 0,
                      admin: {
                        width: '25%',
                        condition: (data) =>
                          Boolean(data?.salary?.enabled) && Boolean(data?.salary?.range),
                      },
                      validate: (value, { data }) => {
                        if (value < data.salary?.minSalary) {
                          return 'Maximum salary must be greater than minimum salary'
                        }

                        return true
                      },
                      required: true,
                    },
                    {
                      name: 'currency',
                      type: 'select',
                      defaultValue: 'czk',
                      options: currencyOptions,
                      admin: {
                        width: '25%',
                        condition: (data) => Boolean(data?.salary?.enabled),
                      },
                      required: true,
                    },
                    {
                      name: 'salaryType',
                      type: 'select',
                      defaultValue: 'monthly',
                      options: salaryTypeOptions,
                      admin: {
                        width: '25%',
                        condition: (data) => Boolean(data?.salary?.enabled),
                      },
                      required: true,
                    },
                  ],
                },
              ],
              access: {
                read: ARCHIVED,
              },
            },
            {
              name: 'description',
              type: 'textarea',
              defaultValue: 'Lorem ipsum',
              access: {
                read: ARCHIVED,
              },
              required: true,
            },
            {
              name: 'richText',
              type: 'richText',
              access: {
                read: ARCHIVED,
              },
            },
            {
              name: 'skills',
              type: 'text',
              hasMany: true,
              access: {
                read: ARCHIVED,
              },
            },
            {
              name: 'certifications',
              type: 'text',
              hasMany: true,
              access: {
                read: ARCHIVED,
              },
            },
            {
              name: 'responsibilities',
              type: 'text',
              hasMany: true,
              access: {
                read: ARCHIVED,
              },
            },
            {
              name: 'benefits',
              type: 'text',
              hasMany: true,
              access: {
                read: ARCHIVED,
              },
            },
            {
              name: 'suitableFor',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'students',
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        width: '25%',
                      },
                    },
                    {
                      name: 'disabledPeople',
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        width: '25%',
                      },
                    },
                    {
                      name: 'mothersOnMaternityLeave',
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        width: '25%',
                      },
                    },
                    {
                      name: 'retirees',
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        width: '25%',
                      },
                    },
                  ],
                },
              ],
              access: {
                read: ARCHIVED,
              },
            },
          ],
        },
        {
          label: 'Applications',
          fields: [
            {
              name: 'applications',
              type: 'relationship',
              maxDepth: 0,
              relationTo: 'applications',
              hasMany: true,
              access: {
                /* 
                  Currently, Payload doesn't support query-based access control for fields, that's why we're using a function that
                  returns a boolean. So all other organizations can still see the IDs of the applications, which is not ideal.
                  We'll update this when Payload supports query-based access control for fields. Good news is that even if they see
                  the IDs, they can't read the applications because of their own access controls.
                */
                read: SA_A_O,
                update: () => false,
              },
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '50%',
            components: {
              Cell: FeaturedCell,
            },
          },
          access: {
            create: SA_A,
            read: ARCHIVED,
            update: SA_A,
          },
        },
        {
          name: 'hasEndDate',
          type: 'checkbox',
          defaultValue: false,
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
      name: 'endDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        condition: (data) => Boolean(data?.hasEndDate),
      },
      access: {
        read: ARCHIVED,
      },
      required: true,
    },
    slugField,
    {
      name: 'customApplyUrl',
      label: 'Custom Apply URL',
      defaultValue: 'https://',
      type: 'text',
      admin: {
        position: 'sidebar'
      },
      access: {
        read: ARCHIVED,
      },
    },
    createdBy,
    {
      name: 'publicId',
      type: 'number',
      required: true,
      access: {
        read: () => true,
        update: () => false,
      },
      admin: {
        condition: (data) => Boolean(data?.publicId),
      },
    },
  ],
}

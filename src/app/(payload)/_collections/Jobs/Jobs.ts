import { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { SA, SA_A, SA_A_O, SA_A_O_Self_createdBy, SA_O } from '@/payload/access'
import { cleanupOrganizationsAfterJobDelete } from './hooks/cleanupOrganizationsAfterJobDelete'
import { languageField } from '@/payload/fields'
import { organizationFilter } from './filters/organizationFilter'
import { populateCreatedBy } from '@/payload/hooks'
import { populateGlobalsDataJobs } from './hooks/populateGlobalsData'
import { populateOrganizationJobs } from './hooks/populateOrganizationJobs'
import { populatePublicId } from './hooks/populatePublicId'
import { revalidateJobAfterChange } from './hooks/revalidateJobAfterChange'
import { revalidateJobAfterDelete } from './hooks/revalidateJobAfterDelete'
import SA_A_O_Some_U from './access/SA_A_O_Some_U'
import { slugField } from '@/payload/fields'
import { statusField } from '@/payload/fields'
import { updateOrganizationJobs } from './hooks/updateOrganizationJobs'
import { User } from '@payload-types'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    group: 'SchoolJob',
    useAsTitle: 'title',
    defaultColumns: ['title', 'organization', 'featured', 'status'],
    hidden: ({ user }) => user?.role === 'candidate',
  },
  hooks: {
    beforeChange: [populateCreatedBy, populatePublicId],
    afterChange: [
      populateGlobalsDataJobs,
      populateOrganizationJobs,
      updateOrganizationJobs,
      revalidateJobAfterChange,
    ],
    afterDelete: [cleanupOrganizationsAfterJobDelete, revalidateJobAfterDelete],
  },
  access: {
    create: SA_O,
    read: SA_A_O_Some_U,
    update: SA_A_O_Self_createdBy,
    delete: SA_A_O_Self_createdBy,
  },
  fields: [
    statusField,
    {
      name: 'title',
      type: 'text',
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
              options: [
                {
                  label: 'Full Time',
                  value: 'fulltime',
                },
                {
                  label: 'Part Time',
                  value: 'parttime',
                },
                {
                  label: 'Contract',
                  value: 'contract',
                },
                {
                  label: 'Temporary',
                  value: 'temporary',
                },
                {
                  label: 'Internship',
                  value: 'internship',
                },
                {
                  label: 'Freelance',
                  value: 'freelance',
                },
                {
                  label: 'Apprenticeship',
                  value: 'apprenticeship',
                },
                {
                  label: 'Volunteer',
                  value: 'volunteer',
                },
                {
                  label: 'Seasonal',
                  value: 'seasonal',
                },
              ],
              hasMany: true,
              required: true,
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
                  name: 'locationType',
                  type: 'select',
                  options: [
                    {
                      label: 'On-site',
                      value: 'onsite',
                    },
                    {
                      label: 'Remote',
                      value: 'remote',
                    },
                    {
                      label: 'Hybrid',
                      value: 'hybrid',
                    },
                  ],
                  hasMany: true,
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
                  name: 'education',
                  type: 'select',
                  options: [
                    {
                      label: 'No education',
                      value: 'noEducation',
                    },
                    {
                      label: 'High school',
                      value: 'highSchool',
                    },
                    {
                      label: 'Associate degree',
                      value: 'associateDegree',
                    },
                    {
                      label: "Bachelor's degree",
                      value: 'bachelorsDegree',
                    },
                    {
                      label: "Master's degree",
                      value: 'mastersDegree',
                    },
                    {
                      label: 'Doctoral degree',
                      value: 'doctoralDegree',
                    },
                    {
                      label: 'Professional degree',
                      value: 'professionalDegree',
                    },
                  ],
                  admin: {
                    width: '50%',
                  },
                  hasMany: true,
                },
                {
                  name: 'experience',
                  type: 'select',
                  options: [
                    {
                      label: 'No experience',
                      value: 'noExperience',
                    },
                    {
                      label: 'Less than 1 year',
                      value: 'lessThanOneYear',
                    },
                    {
                      label: '1-2 years',
                      value: 'oneTwoYears',
                    },
                    {
                      label: '2-3 years',
                      value: 'twoThreeYears',
                    },
                    {
                      label: '3-5 years',
                      value: 'threeFiveYears',
                    },
                    {
                      label: '5-10 years',
                      value: 'fiveTenYears',
                    },
                    {
                      label: '10+ years',
                      value: 'tenPlusYears',
                    },
                  ],
                  admin: {
                    width: '50%',
                  },
                  hasMany: true,
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
                        condition: (data) => data?.salary?.enabled && data?.salary?.range,
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
                      options: [
                        {
                          label: 'CZK',
                          value: 'czk',
                        },
                        {
                          label: 'EUR',
                          value: 'eur',
                        },
                      ],
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
                      options: [
                        {
                          label: 'Hourly',
                          value: 'hourly',
                        },
                        {
                          label: 'Daily',
                          value: 'daily',
                        },
                        {
                          label: 'Weekly',
                          value: 'weekly',
                        },
                        {
                          label: 'Bi-weekly',
                          value: 'biweekly',
                        },
                        {
                          label: 'Monthly',
                          value: 'monthly',
                        },
                        {
                          label: 'Annually',
                          value: 'annually',
                        },
                      ],
                      admin: {
                        width: '25%',
                        condition: (data) => Boolean(data?.salary?.enabled),
                      },
                      required: true,
                    },
                  ],
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
              name: 'skills',
              type: 'json',
            },
            {
              name: 'certifications',
              type: 'json',
            },
            {
              name: 'responsibilities',
              type: 'json',
            },
            {
              name: 'benefits',
              type: 'json',
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
                        width: '20%',
                      },
                    },
                    {
                      name: 'disabledPeople',
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        width: '20%',
                      },
                    },
                    {
                      name: 'pregnantWomen',
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        width: '20%',
                      },
                    },
                    {
                      name: 'mothersOnMaternityLeave',
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        width: '20%',
                      },
                    },
                    {
                      name: 'retirees',
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        width: '20%',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Applications',
          fields: [
            {
              name: 'applications',
              type: 'relationship',
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
                update: SA,
              },
            },
          ],
        },
      ],
    },
    // Sidebar fields
    {
      type: 'row',
      fields: [
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
            update: SA_A,
          },
        },
        {
          name: 'hasEndDate',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        condition: (data) => Boolean(data?.hasEndDate),
      },
      required: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'job-categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations',
      hasMany: false,
      filterOptions: organizationFilter,
      admin: {
        position: 'sidebar',
      },
      access: {
        create: SA_A_O,
        update: SA,
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
    slugField(),
    {
      name: 'customApplyUrl',
      label: 'Custom Apply URL',
      defaultValue: 'https://',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
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
      name: 'publicId',
      type: 'number',
      access: {
        read: () => true,
        update: () => false,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: (data) => Boolean(data?.publicId),
      },
    },
  ],
}

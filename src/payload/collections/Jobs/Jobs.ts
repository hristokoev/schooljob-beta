import { Job, User } from '@payload-types'
import { CollectionConfig } from 'payload'

import { archived, slugField } from '@/payload/fields'
import { categoriesOptions, currencyOptions, cz, educationOptions, employmentTypeOptions, experienceOptions, locationTypeOptions, salaryTypeOptions } from '@/payload/data'
import { cs, en } from '@/translations'
import { dispatchEvents, populateCreatedBy, revalidatePath } from '@/payload/hooks'
import { SA, SA_A, SA_A_O, SA_A_O_Self_createdBy, SA_O } from '@/payload/access'
import { createdBy } from '@/payload/fields'
import { languageField } from '@/payload/fields'
import { organizationFilter } from './filters/organizationFilter'
import { populateEmail } from './hooks/populateEmail'
import { populateGlobalsDataJobs } from './hooks/populateGlobalsData'
import { populateOrganizationJobs } from './hooks/populateOrganizationJobs'
import { populatePublicId } from './hooks/populatePublicId'
import { SA_A_O_Some_U } from './access/SA_A_O_Some_U'
import { SA_O_jobsAllowed } from './access/SA_O_jobsAllowed'
import { statusField } from '@/payload/fields'
import { updateOrganizationJobs } from './hooks/updateOrganizationJobs'
import { updateOrganizationJobsAllowed } from './hooks/updateOrganizationJobsAllowed'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: {
    singular: {
      en: 'Job',
      cs: 'Inzerát',
    },
    plural: {
      en: 'Jobs',
      cs: 'Inzeráty',
    },
  },
  admin: {
    group: {
      en: 'Main',
      cs: 'Hlavní',
    },
    useAsTitle: 'title',
    defaultColumns: ['title', 'organization', 'featured', 'status', 'archived'],
    components: {
      beforeList: ['src/payload/components/Archived/index.tsx#Archived'],
    },
    hidden: ({ user }) => user?.role === 'candidate',
  },
  hooks: {
    beforeChange: [populateCreatedBy, populateEmail, populatePublicId],
    afterChange: [
      dispatchEvents([
        {
          operation: 'create',
          event: 'new-job',
        },
        {
          operation: 'update',
          event: 'job-status-changed',
          field: 'featured',
        }
      ]),
      populateGlobalsDataJobs,
      populateOrganizationJobs,
      revalidatePath,
      updateOrganizationJobs,
      updateOrganizationJobsAllowed,
    ],
  },
  access: {
    create: SA_O_jobsAllowed,
    read: SA_A_O_Some_U,
    update: SA_A_O_Self_createdBy,
    delete: SA,
  },
  fields: [
    archived,
    statusField,
    {
      name: 'title',
      label: {
        en: 'Title',
        cs: 'Název',
      },
      type: 'text',
      defaultValue: '',
      required: true,
    },
    {
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
      required: true,
    },
    {
      name: 'organization',
      label: {
        en: 'Organization',
        cs: 'Organizace',
      },
      type: 'relationship',
      relationTo: 'organizations',
      maxDepth: 2,
      hasMany: false,
      filterOptions: organizationFilter,
      access: {
        create: SA_O,
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
    {
      name: 'email',
      label: {
        en: 'Email',
        cs: 'Email',
      },
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Job Details',
            cs: 'Podrobnosti',
          },
          fields: [
            {
              name: 'employmentType',
              label: {
                en: 'Employment Type',
                cs: 'Typ zaměstnání',
              },
              type: 'select',
              defaultValue: [],
              options: employmentTypeOptions.map(option => ({
                label: {
                  en: en.search.options[option as keyof typeof en.search.options],
                  cs: cs.search.options[option as keyof typeof cs.search.options],
                },
                value: option,
              })),
              hasMany: true,
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'location',
                  label: {
                    en: 'Location',
                    cs: 'Místo',
                  },
                  type: 'select',
                  options: cz,
                  hasMany: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'locationType',
                  label: {
                    en: 'Location Type',
                    cs: 'Typ místa',
                  },
                  type: 'select',
                  defaultValue: [],
                  options: locationTypeOptions.map(option => ({
                    label: {
                      en: en.search.options[option as keyof typeof en.search.options],
                      cs: cs.search.options[option as keyof typeof cs.search.options],
                    },
                    value: option,
                  })),
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
                  label: {
                    en: 'Education',
                    cs: 'Vzdělání',
                  },
                  type: 'select',
                  defaultValue: [],
                  options: educationOptions.map(option => ({
                    label: {
                      en: en.search.options[option as keyof typeof en.search.options],
                      cs: cs.search.options[option as keyof typeof cs.search.options],
                    },
                    value: option,
                  })),
                  admin: {
                    width: '50%',
                  },
                  hasMany: true,
                },
                {
                  name: 'experience',
                  label: {
                    en: 'Experience',
                    cs: 'Zkušenosti',
                  },
                  type: 'select',
                  defaultValue: [],
                  options: experienceOptions.map(option => ({
                    label: {
                      en: en.search.options[option as keyof typeof en.search.options],
                      cs: cs.search.options[option as keyof typeof cs.search.options],
                    },
                    value: option,
                  })),
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
              label: {
                en: 'Salary',
                cs: 'Ohodnocení',
              },
              type: 'group',
              fields: [
                {
                  type: 'checkbox',
                  name: 'enabled',
                  label: {
                    en: 'Enabled',
                    cs: 'Povoleno',
                  },
                  defaultValue: false,
                },
                {
                  type: 'checkbox',
                  name: 'range',
                  label: {
                    en: 'Range',
                    cs: 'Rozsah',
                  },
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
                      label: {
                        en: 'Base',
                        cs: 'Základ',
                      },
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
                      label: {
                        en: 'Min Salary',
                        cs: 'Min. ohodnocení',
                      },
                      type: 'number',
                      defaultValue: 0,
                      admin: {
                        width: '25%',
                        condition: (data) =>
                          Boolean(data?.salary?.enabled) && Boolean(data?.salary?.range),
                      },
                      validate: (value, { data }: { data: Partial<Job> }) => {
                        if (typeof data.salary?.maxSalary !== 'number') {
                          return true
                        }

                        if (value > data.salary.maxSalary) {
                          return 'Minimum salary must be less than maximum salary'
                        }

                        return true
                      },
                      required: true,
                    },
                    {
                      name: 'maxSalary',
                      label: {
                        en: 'Max Salary',
                        cs: 'Max. ohodnocení',
                      },
                      type: 'number',
                      defaultValue: 0,
                      admin: {
                        width: '25%',
                        condition: (data) =>
                          Boolean(data?.salary?.enabled) && Boolean(data?.salary?.range),
                      },
                      validate: (value, { data }: { data: Partial<Job> }) => {
                        if (typeof data.salary?.minSalary !== 'number') {
                          return true
                        }

                        if (value > data.salary.minSalary) {
                          return 'Maximum salary must be greater than minimum salary'
                        }

                        return true
                      },
                      required: true,
                    },
                    {
                      name: 'currency',
                      label: {
                        en: 'Currency',
                        cs: 'Měna',
                      },
                      type: 'select',
                      defaultValue: 'czk',
                      options: currencyOptions.map(option => ({
                        label: {
                          en: en.search.options[option as keyof typeof en.search.options],
                          cs: cs.search.options[option as keyof typeof cs.search.options],
                        },
                        value: option,
                      })),
                      admin: {
                        width: '25%',
                        condition: (data) => Boolean(data?.salary?.enabled),
                      },
                      required: true,
                    },
                    {
                      name: 'salaryType',
                      label: {
                        en: 'Salary Type',
                        cs: 'Typ ohodnocení',
                      },
                      type: 'select',
                      defaultValue: 'monthly',
                      options: salaryTypeOptions.map(option => ({
                        label: {
                          en: en.search.options[option as keyof typeof en.search.options],
                          cs: cs.search.options[option as keyof typeof cs.search.options],
                        },
                        value: option,
                      })),
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
              name: 'richText',
              label: {
                en: 'Rich Text',
                cs: 'Celý text',
              },
              type: 'richText',
            },
            {
              name: 'skills',
              label: {
                en: 'Skills',
                cs: 'Dovednosti',
              },
              type: 'text',
              hasMany: true,
            },
            {
              name: 'certifications',
              label: {
                en: 'Certifications',
                cs: 'Certifikáty',
              },
              type: 'text',
              hasMany: true,
            },
            {
              name: 'benefits',
              label: {
                en: 'Benefits',
                cs: 'Benefity',
              },
              type: 'text',
              hasMany: true,
            },
            {
              name: 'suitableFor',
              label: {
                en: 'Suitable for',
                cs: 'Vhodné pro',
              },
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'students',
                      label: {
                        en: 'Students',
                        cs: 'Studentů',
                      },
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        width: '25%',
                      },
                    },
                    {
                      name: 'disabledPeople',
                      label: {
                        en: 'Disabled People',
                        cs: 'Zdravotně postižené',
                      },
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        width: '25%',
                      },
                    },
                    {
                      name: 'mothersOnMaternityLeave',
                      label: {
                        en: 'Mothers on Maternity Leave',
                        cs: 'Ženy na MD',
                      },
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        width: '25%',
                      },
                    },
                    {
                      name: 'retirees',
                      label: {
                        en: 'Retirees',
                        cs: 'Důchodci',
                      },
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        width: '25%',
                      },
                    },
                  ],
                },
              ],
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
                cs: 'Žádostí',
              },
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
                update: SA,
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
          label: {
            en: 'Featured',
            cs: 'Zvýrazněno ⭐',
          },
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '50%',
            components: {
              Cell: 'src/payload/cells/index.ts#FeaturedCell',
            },
          },
          access: {
            create: SA,
            update: SA_A,
          },
        },
      ],
    },
    slugField,
    createdBy,
    {
      name: 'publicId',
      label: {
        en: 'Public ID',
        cs: 'Veřejné ID',
      },
      type: 'number',
      required: true,
      access: {
        read: () => true,
        update: SA,
      },
      admin: {
        position: 'sidebar',
        condition: (data) => Boolean(data?.publicId),
      },
    },
  ],
}

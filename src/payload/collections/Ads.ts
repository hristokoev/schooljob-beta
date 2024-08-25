import { Ad } from '@payload-types'
import { CollectionConfig } from 'payload'

import { SA, SA_A } from '@/payload/access'
import { revalidatePath } from '@/payload/hooks'

export const Ads: CollectionConfig = {
  slug: 'ads',
  labels: {
    singular: {
      en: 'Ad',
      cs: 'Reklama',
    },
    plural: {
      en: 'Ads',
      cs: 'Reklamy',
    }
  },
  admin: {
    group: {
      en: 'Others',
      cs: 'Další',
    },
    useAsTitle: 'title',
    defaultColumns: ['title', 'page', 'width', 'height', 'enabled'],
    hidden: ({ user }) => user?.role === 'organization' || user?.role === 'candidate',
  },
  access: {
    create: SA,
    read: () => true,
    update: SA_A,
    delete: SA,
  },
  hooks: {
    afterChange: [
      revalidatePath,
    ],
  },
  fields: [
    {
      name: 'enabled',
      label: {
        en: 'Enabled',
        cs: 'Aktivní',
      },
      type: 'checkbox',
    },
    {
      name: 'title',
      label: {
        en: 'Title',
        cs: 'Název',
      },
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'bannerDesktop',
          label: {
            en: 'Banner (desktop)',
            cs: 'Banner (desktop)',
          },
          type: 'upload',
          relationTo: 'banners',
          required: true,
        },
        {
          name: 'bannerMobile',
          label: {
            en: 'Banner (mobile)',
            cs: 'Banner (mobile)',
          },
          type: 'upload',
          relationTo: 'banners',
          required: true,
        },
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'page',
          label: {
            en: 'Page',
            cs: 'Stránka',
          },
          type: 'select',
          options: [
            {
              label: {
                en: 'Home',
                cs: 'Úvodní stránka',
              },
              value: 'home',
            },
            {
              label: {
                en: 'Jobs',
                cs: 'Práce',
              },
              value: 'jobs',
            },
            {
              label: {
                en: 'Organizations',
                cs: 'Organizace',
              },
              value: 'organizations',
            }
          ],
          admin: {
            width: '50%',
          },
          required: true,
          defaultValue: 'home',
        },
        {
          name: 'position',
          label: {
            en: 'Position',
            cs: 'Umístění',
          },
          type: 'select',
          options: [
            {
              label: {
                en: 'After Header',
                cs: 'Za hlavičkou',
              },
              value: 'afterHeader',
            },
            {
              label: {
                en: 'After Featured Jobs',
                cs: 'Po zvýrazněných jobs',
              },
              value: 'afterFeaturedJobs',
            },
            {
              label: {
                en: 'Before Organizations',
                cs: 'Před organizacemi',
              },
              value: 'beforeOrganizations',
            },
            {
              label: {
                en: 'After Organizations',
                cs: 'Po organizacích',
              },
              value: 'afterOrganizations',
            },
            {
              label: {
                en: 'Before Footer',
                cs: 'Před patičkou',
              },
              value: 'beforeFooter',
            },
            {
              label: {
                en: 'After Featured Organizations',
                cs: 'Po zvýrazněných organizacích',
              },
              value: 'afterFeaturedOrganizations',
            },
          ],
          admin: {
            width: '50%',
          },
          required: true,
          validate: (value, { data, req }) => {
            if (!value) {
              return req.i18n.t('validation:required')
            }

            const validPositions = {
              home: ['afterHeader', 'afterFeaturedJobs', 'beforeOrganizations', 'afterOrganizations', 'beforeFooter'],
              jobs: ['afterHeader', 'afterFeaturedJobs', 'beforeFooter'],
              organizations: ['afterHeader', 'afterFeaturedOrganizations', 'beforeFooter'],
            }

            if (!validPositions[(data as Ad).page].includes(value)) {
              return req.i18n.t('validation:invalidSelection')
            }

            return true
          }
        }
      ]
    },
    {
      type: 'row',
      fields: [{
        name: 'width',
        label: {
          en: 'Width',
          cs: 'Šířka',
        },
        type: 'select',
        options: [
          {
            label: {
              en: 'Full',
              cs: 'Celá',
            },
            value: 'full',
          },
          {
            label: {
              en: 'Normal',
              cs: 'Normální',
            },
            value: 'normal',
          },
        ],
        admin: {
          width: '50%'
        },
        required: true,
        defaultValue: 'normal',
      },
      {
        name: 'height',
        label: {
          en: 'Height',
          cs: 'Výška',
        },
        type: 'select',
        options: [
          {
            label: {
              en: '144 px',
              cs: '144 px',
            },
            value: '36',
          },
          {
            label: {
              en: '192 px',
              cs: '192 px',
            },
            value: '48',
          },
          {
            label: {
              en: '256 px',
              cs: '256 px',
            },
            value: '64',
          },
          {
            label: {
              en: '288 px',
              cs: '288 px',
            },
            value: '72',
          },
          {
            label: {
              en: '384 px',
              cs: '384 px',
            },
            value: '96',
          },
        ],
        admin: {
          width: '50%'
        },
        required: true,
        defaultValue: '48',
      },]
    },
    {
      type: 'row',
      fields: [{
        name: 'paddingTop',
        label: {
          en: 'Padding Top',
          cs: 'Horní mezera',
        },
        type: 'select',
        options: [
          {
            label: {
              en: 'None',
              cs: 'Žádná',
            },
            value: 'none',
          },
          {
            label: {
              en: 'Small',
              cs: 'Malá',
            },
            value: 'sm',
          },
          {
            label: {
              en: 'Medium',
              cs: 'Střední',
            },
            value: 'md',
          },
          {
            label: {
              en: 'Large',
              cs: 'Velká',
            },
            value: 'lg',
          },
        ],
        admin: {
          width: '50%'
        },
        required: true,
        defaultValue: 'md'
      },
      {
        name: 'paddingBottom',
        label: {
          en: 'Padding Bottom',
          cs: 'Dolní mezera',
        },
        type: 'select',
        options: [
          {
            label: {
              en: 'None',
              cs: 'Žádná',
            },
            value: 'none',
          },
          {
            label: {
              en: 'Small',
              cs: 'Malá',
            },
            value: 'sm',
          },
          {
            label: {
              en: 'Medium',
              cs: 'Střední',
            },
            value: 'md',
          },
          {
            label: {
              en: 'Large',
              cs: 'Velká',
            },
            value: 'lg',
          },
        ],
        admin: {
          width: '50%'
        },
        required: true,
        defaultValue: 'md'
      },]
    },
    {
      name: 'background',
      label: {
        en: 'Background',
        cs: 'Pozadí',
      },
      type: 'select',
      options: [
        {
          label: {
            en: 'White',
            cs: 'Bílé',
          },
          value: 'white',
        },
        {
          label: {
            en: 'Slate',
            cs: 'Šedé',
          },
          value: 'slate-100',
        },
      ],
      required: true,
      defaultValue: 'white'
    },
    {
      name: 'url',
      label: {
        en: 'URL',
        cs: 'URL',
      },
      type: 'text',
      required: true,
    },
  ],
}

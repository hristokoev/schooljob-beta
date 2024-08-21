import { Block, CollectionConfig } from 'payload'

import { SA, SA_A, SA_A_O } from '@/payload/access'

const Text: Block = {
  slug: 'Text',
  imageURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/images/ui/text.png`,
  imageAltText: 'Add text to your email template',
  interfaceName: 'TextBlock',
  fields: [
    {
      name: 'text',
      label: {
        en: 'Text',
        cs: 'Text',
      },
      type: 'richText',
      required: true,
    },
  ],
}

const Button: Block = {
  slug: 'Button',
  imageURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/images/ui/url.png`,
  imageAltText: 'Add a button to your email template',
  interfaceName: 'ButtonBlock',
  fields: [
    {
      name: 'text',
      label: {
        en: 'Text',
        cs: 'Text',
      },
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      label: {
        en: 'Link',
        cs: 'Odkaz',
      },
      type: 'text',
      required: true,
    },
  ],
}

export const EmailTemplates: CollectionConfig = {
  slug: 'email-templates',
  labels: {
    singular: {
      en: 'Email Template',
      cs: 'Šablona e-mailů',
    },
    plural: {
      en: 'Email Templates',
      cs: 'Šablony e-mailů',
    },
  },
  admin: {
    group: {
      en: 'Others',
      cs: 'Další',
    },
    useAsTitle: 'title',
    defaultColumns: ['title', 'to', 'event'],
    hidden: ({ user }) => user?.role === 'organization' || user?.role === 'candidate',
  },
  access: {
    create: SA,
    read: SA_A_O,
    update: SA_A,
    delete: SA,
  },
  fields: [
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
      name: 'from',
      label: {
        en: 'From',
        cs: 'Odesílatel',
      },
      type: 'select',
      options: [
        {
          label: 'no-reply@schooljob.cz',
          value: 'no-reply',
        },
      ],
      required: true,
    },
    {
      name: 'to',
      label: {
        en: 'To',
        cs: 'Příjemce',
      },
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Candidate',
          value: 'candidate',
        },
        {
          label: 'Organization',
          value: 'organization',
        },
      ],
      required: true,
    },
    {
      name: 'preview',
      label: {
        en: 'Preview',
        cs: 'Krátký popis',
      },
      type: 'text',
      required: true,
    },
    {
      name: 'blocks',
      labels: {
        singular: {
          en: 'Block',
          cs: 'Blok',
        },
        plural: {
          en: 'Blocks',
          cs: 'Bloky',
        },
      },
      type: 'blocks',
      blocks: [Text, Button],
      required: true,
    },
    {
      name: 'footer',
      label: {
        en: 'Footer',
        cs: 'Paticka',
      },
      type: 'text',
      required: true,
    },
    {
      name: 'event',
      label: {
        en: 'Event',
        cs: 'Aktivováno při',
      },
      type: 'select',
      unique: true,
      options: [
        {
          label: {
            en: 'New Candidate',
            cs: 'Nový kandidát',
          },
          value: 'new-candidate',
        },
        {
          label: {
            en: 'New Organization',
            cs: 'Nová organizace',
          },
          value: 'new-organization',
        },
        {
          label: {
            en: 'Reset Password',
            cs: 'Reset hesla',
          },
          value: 'reset-password',
        },
        {
          label: {
            en: 'New Job',
            cs: 'Nový inzerát',
          },
          value: 'new-job',
        },
        {
          label: {
            en: 'Job Status Changed',
            cs: 'Stav inzerátu změněn',
          },
          value: 'job-status-changed',
        },
        {
          label: {
            en: 'New Application',
            cs: 'Nová žádost',
          },
          value: 'new-application',
        },
        {
          label: {
            en: 'Application Status - Pending',
            cs: 'Stav žádosti - Čeká na schválení',
          },
          value: 'application-status-pending',
        },
        {
          label: {
            en: 'Application Status - Accepted',
            cs: 'Stav žádosti - Schváleno',
          },
          value: 'application-status-accepted',
        },
        {
          label: {
            en: 'Application Status - Rejected',
            cs: 'Stav žádosti - Odmítnuto',
          },
          value: 'application-status-rejected',
        },
        {
          label: {
            en: 'Application Status - Interview',
            cs: 'Stav žádosti - Pohovor',
          },
          value: 'application-status-interview',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

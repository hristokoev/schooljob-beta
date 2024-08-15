import { Block, CollectionConfig } from 'payload'

import { SA, SA_A } from '@/payload/access'

const Text: Block = {
  slug: 'Text',
  imageURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/images/ui/text.png`,
  imageAltText: 'Add text to your email template',
  interfaceName: 'TextBlock',
  fields: [
    {
      name: 'text',
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
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      required: true,
    },
  ],
}

export const EmailTemplates: CollectionConfig = {
  slug: 'email-templates',
  labels: {
    singular: 'Email Template',
    plural: 'Email Templates',
  },
  admin: {
    group: 'SchoolJob',
    useAsTitle: 'title',
    defaultColumns: ['title', 'to', 'event'],
  },
  access: {
    create: SA_A,
    read: SA_A,
    update: SA_A,
    delete: SA,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'from',
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
      type: 'text',
      required: true,
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [Text, Button],
      required: true,
    },
    {
      name: 'footer',
      type: 'text',
      required: true,
    },
    {
      name: 'event',
      type: 'select',
      unique: true,
      options: [
        {
          label: 'New Candidate',
          value: 'new-candidate',
        },
        {
          label: 'New Organization',
          value: 'new-organization',
        },
        {
          label: 'Reset Password',
          value: 'reset-password',
        },
        {
          label: 'New Job',
          value: 'new-job',
        },
        {
          label: 'Job Status Changed',
          value: 'job-status-changed',
        },
        {
          label: 'New Application',
          value: 'new-application',
        },
        {
          label: 'Application Status Changed',
          value: 'application-status-changed',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

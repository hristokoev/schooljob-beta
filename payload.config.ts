import {
  BoldFeature,
  FixedToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  StrikethroughFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import { buildConfig, Where } from 'payload'
import { cs } from 'payload/i18n/cs'
import { en } from 'payload/i18n/en'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'
import { s3Storage } from '@payloadcms/storage-s3'
import { searchPlugin } from '@payloadcms/plugin-search'
import sharp from 'sharp'

import { fileURLToPath } from 'url'
import path from 'path'

import { AccessNavLink, AccessView } from '@/payload/views'
import {
  Agreements,
  Applications,
  Candidates,
  Cvs,
  EmailTemplates,
  ImageCovers,
  Jobs,
  Logos,
  Memberships,
  Orders,
  Organizations,
  Partners,
  Photos,
  Users,
} from '@/payload/collections'
import { cs as customCs, en as customEn } from '@/payload/translations'
import { Icon, Logo } from '@/payload/components'
import { cachedPayloadPlugin } from './cached-local-api'
import { Data } from '@/payload/globals'
import { extractTopKeywords } from '@/payload/utilities'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor({
    features: () => [
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      FixedToolbarFeature()
    ],
  }),
  admin: {

    components: {
      afterNavLinks: [AccessNavLink],
      graphics: {
        Icon: Icon,
        Logo: Logo,
      },
      views: {
        'access': {
          Component: AccessView,
          path: '/access',
          exact: true,
        },
      }
    },
  },
  collections: [
    Jobs,
    Applications,
    Organizations,
    Candidates,
    Cvs,
    Logos,
    ImageCovers,
    Photos,
    Agreements,
    EmailTemplates,
    Memberships,
    Orders,
    Partners,
    Users,
  ],
  globals: [Data],
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_EMAIL || '',
    defaultFromName: process.env.RESEND_FROM_NAME || '',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
    connectOptions: {
      dbName: process.env.MONGODB_NAME || '',
    },
  }),
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),

  /**
   * Payload can now accept specific translations from 'payload/i18n/en'
   * This is completely optional and will default to English if not provided
   */
  i18n: {
    supportedLanguages: { en, cs },
    fallbackLanguage: 'cs',
    translations: {
      en: customEn,
      cs: customCs,
    },
  },

  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable
  sharp,
  plugins: [
    cachedPayloadPlugin,
    s3Storage({
      enabled: true,
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: process.env.R2_REGION,
        endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.eu.r2.cloudflarestorage.com`,
      },
      bucket: process.env.R2_SITE_UPLOADS_BUCKET || '',
      collections: {
        cvs: { prefix: 'cvs' },
        logos: { prefix: 'logos' },
        'image-covers': { prefix: 'covers' },
        photos: { prefix: 'photos' },
      },
    }),
    searchPlugin({
      collections: ['jobs', 'organizations'],
      defaultPriorities: {
        jobs: 10,
        organizations: 20
      },
      beforeSync: ({ originalDoc, searchDoc }) => ({
        ...searchDoc,
        status: originalDoc?.status,
        slug: originalDoc?.slug,
        publicId: originalDoc?.publicId,
        keywords: originalDoc?.richText ? extractTopKeywords(originalDoc.richText, 25).join(', ') : "",
      }),
      searchOverrides: {
        admin: {
          hidden: ({ user }) => user?.role !== 'super-admin'
        },
        access: {
          read: () => {
            return {
              or: [
                {
                  status: {
                    equals: 'published',
                  },
                },
                {
                  'doc.relationTo': {
                    equals: 'organizations',
                  },
                },
              ] as Where[]
            }
          }
        },
        fields: [
          {
            name: 'status',
            type: 'text',
            index: true
          },
          {
            name: 'slug',
            type: 'text',
            index: true
          },
          {
            name: 'publicId',
            type: 'text',
            index: true
          },
          {
            name: 'keywords',
            type: 'text',
            index: true
          }
        ],
      }
    })
  ],
})

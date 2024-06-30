import path from 'path'
import { en } from 'payload/i18n/en'
import {
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  AlignFeature,
  lexicalEditor,
  FixedToolbarFeature,
} from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import {
  Agreements,
  Applications,
  Candidates,
  Cvs,
  Jobs,
  Organizations,
  SiteUploads,
  Users,
} from '@/payload/collections'
import { Data } from '@/payload/globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor({
    features: ({ defaultFeatures, rootFeatures }) => [
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      AlignFeature(),
      FixedToolbarFeature()
    ],
  }),
  collections: [
    Jobs,
    Organizations,
    Candidates,
    Applications,
    Cvs,
    SiteUploads,
    Agreements,
    Users,
  ],
  globals: [Data],
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
    supportedLanguages: { en },
  },

  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable
  sharp,
  plugins: [
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
        'site-uploads': {
        },
        cvs: {
          prefix: 'cvs',
        },
      },
    }),
  ],
})

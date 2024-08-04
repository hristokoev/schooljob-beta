import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: 'schooljob-beta.coolify.koev.cz',
        pathname: '/api/logos/file/**',
      },
      {
        protocol: 'https',
        hostname: 'schooljob-beta.coolify.koev.cz',
        pathname: '/api/image-covers/file/**',
      },
      {
        protocol: 'https',
        hostname: 'schooljob-beta.coolify.koev.cz',
        pathname: '/api/photos/file/**',
      },
    ],
  },
}

export default withNextIntl(withPayload(nextConfig))

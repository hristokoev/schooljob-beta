import createNextIntlPlugin from 'next-intl/plugin'
import { withPayload } from '@payloadcms/next/withPayload'

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
        hostname: `${process.env.HOSTNAME}`,
        pathname: '/api/banners/file/**',
      },
      {
        protocol: 'https',
        hostname: `${process.env.HOSTNAME}`,
        pathname: '/api/logos/file/**',
      },
      {
        protocol: 'https',
        hostname: `${process.env.HOSTNAME}`,
        pathname: '/api/image-covers/file/**',
      },
      {
        protocol: 'https',
        hostname: `${process.env.HOSTNAME}`,
        pathname: '/api/photos/file/**',
      },
    ],
  },
}

export default withNextIntl(withPayload(nextConfig))

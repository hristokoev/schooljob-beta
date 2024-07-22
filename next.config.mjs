import { withPayload } from '@payloadcms/next/withPayload'

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

export default withPayload(nextConfig)

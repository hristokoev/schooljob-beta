import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
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
        pathname: '/logos/**',
      },
      {
        protocol: 'https',
        hostname: 'schooljob-beta.coolify.koev.cz',
        pathname: '/image-covers/**',
      },
      {
        protocol: 'https',
        hostname: 'schooljob-beta.coolify.koev.cz',
        pathname: '/photos/**',
      },
    ],
  },
}

export default withPayload(nextConfig)

import type { Ad } from '@payload-types'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import Link from 'next/link'
import React from 'react'

import { Gutter, Media, VerticalPadding } from '@/components'
import { cn } from '@/utilities/cn'

type BannerBlockProps =
  | { page: 'home'; position: Ad['homePosition'] }
  | { page: 'jobs'; position: Ad['jobsPosition'] }
  | { page: 'organizations'; position: Ad['organizationsPosition'] }

const BannerBlock: React.FC<BannerBlockProps> = async ({ page, position }) => {
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const banner = await payload.find({
    collection: 'ads',
    where: {
      and: [
        { page: { equals: page } },
        { ...(page === 'home' && { homePosition: { equals: position } }) },
        { ...(page === 'jobs' && { jobsPosition: { equals: position } }) },
        { ...(page === 'organizations' && { organizationsPosition: { equals: position } }) },
      ],
    },
    limit: 1,
  })

  if (!banner) {
    return null
  }

  const {
    enabled,
    width,
    height,
    paddingTop,
    paddingBottom,
    background,
    title,
    bannerDesktop,
    bannerMobile,
    url,
  } = banner.docs[0]

  if (!enabled) {
    return null
  }

  return (
    <VerticalPadding
      top={paddingTop}
      bottom={paddingBottom}
      className={cn(
        background === 'white' && 'bg-white',
        background === 'slate-100' && 'bg-slate-100',
      )}
    >
      <Gutter className={cn(width === 'full' && 'max-w-full px-0')}>
        <Link href={url} target="_blank">
          {/* Desktop Version */}
          <Media
            resource={bannerDesktop}
            className={cn(
              width === 'normal' && 'rounded-sm border border-slate-300 shadow-sm',
              height === '36' && 'h-36',
              height === '48' && 'h-48',
              height === '64' && 'h-64',
              height === '72' && 'h-72',
              height === '96' && 'h-96',
              'overflow-hidden',
              'hidden md:block',
            )}
            imgClassName="object-cover h-full"
            alt={title}
          />
          {/* Mobile Version */}
          <Media
            resource={bannerMobile}
            className={cn(
              width === 'normal' && 'rounded-sm border border-slate-300 shadow-sm',
              height === '36' && 'h-36',
              height === '48' && 'h-48',
              height === '64' && 'h-64',
              height === '72' && 'h-72',
              height === '96' && 'h-96',
              'overflow-hidden',
              'block md:hidden',
            )}
            imgClassName="object-cover h-full"
            alt={title}
          />
        </Link>
      </Gutter>
    </VerticalPadding>
  )
}

export { BannerBlock }

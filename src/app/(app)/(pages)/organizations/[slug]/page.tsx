import React, { Fragment, Suspense } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { Description } from './Description'
import { DescriptionSkeleton } from './Description/Skeleton'
import { Gutter, MinHeight, VerticalPadding } from '@/components'
import { JobsBlock } from '@/pages/organizations/[slug]/JobsBlock'
import { JobsListSkeleton } from '@/blocks'
import { ProfileBlock } from './Profile'
import { ProfileBlockSkeleton } from './Profile/Skeleton'

interface Props {
  params: {
    slug: string
  }
}

export default async function Organization({ params: { slug } }: Props) {
  return (
    <Fragment>
      <MinHeight className="bg-slate-100">
        <Suspense fallback={<ProfileBlockSkeleton />}>
          <ProfileBlock slug={slug} />
        </Suspense>
        <VerticalPadding top="lg" bottom="lg" className="bg-white">
          <Gutter>
            <Suspense fallback={<DescriptionSkeleton />}>
              <Description slug={slug} />
            </Suspense>
          </Gutter>
        </VerticalPadding>
        <VerticalPadding className="bg-slate-100">
          <Gutter>
            <Suspense fallback={<JobsListSkeleton count={3} />}>
              <JobsBlock slug={slug} />
            </Suspense>
          </Gutter>
        </VerticalPadding>
      </MinHeight>
    </Fragment>
  )
}

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const pages = await payload.find({
    collection: 'organizations',
    limit: 100,
    overrideAccess: false,
  })

  return pages.docs?.map(({ slug }) => ({
    slug,
  }))
}

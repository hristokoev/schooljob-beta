import React, { Fragment, Suspense } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { JobBlock, JobBlockSkeleton } from './JobBlock'
import { BreadcrumbBlock } from '@/blocks'
import { Gutter, VerticalPadding } from '@/components'

interface Props {
  params: {
    publicId: string
    slug: string
  }
}

export default async function Job({ params: { publicId, slug } }: Props) {
  const links = [
    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'Jobs',
      href: '/jobs',
    },
  ]

  return (
    <Fragment>
      <VerticalPadding className="bg-slate-100">
        <Gutter>
          <BreadcrumbBlock links={links} current="Job" />
          <Suspense fallback={<JobBlockSkeleton />}>
            <JobBlock publicId={publicId} slug={slug} />
          </Suspense>
        </Gutter>
      </VerticalPadding>
    </Fragment>
  )
}

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const pages = await payload.find({
    collection: 'jobs',
    limit: 100,
    where: {
      status: {
        equals: 'published',
      },
    },
  })

  return pages.docs?.map(({ publicId, slug }) => ({
    publicId: publicId?.toString() || 'job',
    slug,
  }))
}

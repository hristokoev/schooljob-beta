import React, { Fragment, Suspense } from 'react'

import { JobBlock, JobBlockSkeleton } from './JobBlock'
import { BreadcrumbBlock } from '@/blocks'
import { fetchStaticParams } from '@/api'
import { Gutter, VerticalPadding } from '@/components'
import { Job as JobType } from '@payload-types'

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
          <BreadcrumbBlock links={links} current="Current Job" />
          <Suspense fallback={<JobBlockSkeleton />}>
            <JobBlock publicId={publicId} slug={slug} />
          </Suspense>
        </Gutter>
      </VerticalPadding>
    </Fragment>
  )
}

export async function generateStaticParams() {
  try {
    const pages = await fetchStaticParams<JobType>('jobs')

    return pages.map(({ publicId, slug }) => ({
      publicId: publicId?.toString() ?? '',
      slug,
    }))
  } catch (error) {
    return []
  }
}

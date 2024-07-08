import React, { Fragment, Suspense } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

import { Button, Gutter, TopLabel, VerticalPadding } from '@/components'
import { CtaBlock, InfiniteScroll, JobsList, JobsListSkeleton } from '@/blocks'
import {
  JobsSwipe,
  JobsSwipeSkeleton,
  OrganizationsGrid,
  OrganizationsGridSkeleton,
  SearchBlock,
} from '@/blocks'

export const dynamic = 'force-static'

export default function Index() {
  return (
    <Fragment>
      <VerticalPadding>
        <Gutter className="min-h-[36dvh] md:mt-[12dvh]">
          <SearchBlock />
        </Gutter>
      </VerticalPadding>
      <VerticalPadding className="overflow-hidden bg-slate-100">
        <Gutter>
          <Suspense fallback={<JobsSwipeSkeleton />}>
            <TopLabel text="Recommended jobs" url="/jobs" urlText="View all jobs" />
            <JobsSwipe featured />
          </Suspense>
        </Gutter>
      </VerticalPadding>
      <VerticalPadding className="bg-slate-100">
        <Gutter>
          <Suspense fallback={<JobsListSkeleton />}>
            <TopLabel text="Most recent jobs" url="/jobs" urlText="View all jobs" />
            <JobsList limit={5} />
            <div className="mt-8 w-full text-center">
              <Link href="/jobs">
                <Button>View All Jobs</Button>
              </Link>
            </div>
          </Suspense>
        </Gutter>
      </VerticalPadding>
      <VerticalPadding top="lg" bottom="lg">
        <InfiniteScroll />
      </VerticalPadding>
      <VerticalPadding bottom="none" className="bg-gradient-to-b from-slate-100 to-white">
        <Gutter>
          <TopLabel text="Organizations" url="/organizations" urlText="View all organizations" />
          <Suspense fallback={<OrganizationsGridSkeleton count={6} />}>
            <OrganizationsGrid limit={6} />
            <div className="relative mt-8 w-full text-center">
              <div className="absolute bottom-8 z-10 flex h-96 w-full items-center justify-center bg-gradient-to-b from-transparent to-white">
                <Link href="/organizations" className="mt-64">
                  <Button>View All Organizations</Button>
                </Link>
              </div>
            </div>
          </Suspense>
        </Gutter>
      </VerticalPadding>
      <VerticalPadding>
        <Gutter>
          <CtaBlock
            title="Ready to get started?"
            items={['Create an account', 'Browse jobs']}
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </Gutter>
      </VerticalPadding>
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Index',
  description: 'Index page.',
}

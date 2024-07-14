import React, { Fragment, Suspense } from 'react'
import { Metadata } from 'next'

import { Gutter, Hr, MinHeight, TopLabel, VerticalPadding } from '@/components'
import { JobSearchParams } from '@/types'
import { JobsList, JobsListSkeleton } from '@/blocks'
import { parseSearchParams } from '@/utilities'
import { SearchBlock } from './SearchBlock'

export default function Jobs({ searchParams }: { searchParams: JobSearchParams }) {
  const parsedSearchParams = parseSearchParams(searchParams as Record<string, string | number>)

  return (
    <MinHeight className="bg-slate-100">
      <VerticalPadding className="bg-white">
        <Gutter>
          <SearchBlock />
        </Gutter>
      </VerticalPadding>
      {Object.keys(searchParams).length ? (
        <VerticalPadding>
          <Gutter>
            <TopLabel text="Search results" url="/jobs" urlText="Reset search" />
            <Suspense fallback={<JobsListSkeleton count={8} key={0} />}>
              <JobsList limit={8} page={1} sort="-createdAt" loadMore {...parsedSearchParams} />
            </Suspense>
          </Gutter>
        </VerticalPadding>
      ) : (
        <Fragment>
          <VerticalPadding className="bg-slate-100">
            <Gutter>
              <TopLabel text="Recommended jobs" />
              <Suspense fallback={<JobsListSkeleton count={4} key={0} />}>
                <JobsList featured />
              </Suspense>
            </Gutter>
          </VerticalPadding>
          <Gutter>
            <Hr className="my-0 border-slate-300" />
          </Gutter>
          <VerticalPadding className="bg-slate-100">
            <Gutter>
              <TopLabel text="All jobs" />
              <Suspense fallback={<JobsListSkeleton count={8} key={2} />}>
                <JobsList limit={8} page={1} featured={false} sort="-createdAt" loadMore />
              </Suspense>
            </Gutter>
          </VerticalPadding>
        </Fragment>
      )}
    </MinHeight>
  )
}

export const metadata: Metadata = {
  title: 'Jobs',
  description: 'Jobs page.',
}

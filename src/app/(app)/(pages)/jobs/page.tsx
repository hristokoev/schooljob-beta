import React, { Fragment, Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

import { Gutter, Hr, MinHeight, TopLabel, VerticalPadding } from '@/components'
import { JobsList, JobsListSkeleton } from '@/blocks'
import { JobSearchParams } from '@/types'
import { parseSearchParams } from '@/utilities'
import { SearchBlock } from './SearchBlock'

export default async function Jobs({ searchParams }: { searchParams: JobSearchParams }) {
  const t = await getTranslations()
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
            <TopLabel text={t.rich('search.results')} />
            <Suspense fallback={<JobsListSkeleton count={8} key={0} />}>
              <JobsList limit={8} page={1} sort="-createdAt" loadMore {...parsedSearchParams} />
            </Suspense>
          </Gutter>
        </VerticalPadding>
      ) : (
        <Fragment>
          <VerticalPadding className="bg-slate-100">
            <Gutter>
              <TopLabel text={t('ui.recommendedJobs')} />
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
              <TopLabel text={t('ui.allJobs')} />
              <Suspense fallback={<JobsListSkeleton count={8} key={2} />}>
                <JobsList limit={8} page={1} sort="-createdAt" loadMore />
              </Suspense>
            </Gutter>
          </VerticalPadding>
        </Fragment>
      )}
    </MinHeight>
  )
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.jobs' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

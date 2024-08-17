'use client'

import React, { Fragment, useState } from 'react'
import { Job } from '@payload-types'
import { PaginatedDocs } from 'payload'
import { useTranslations } from 'next-intl'

import { Button } from '@/components'
import { fetchDocs } from '@/api'
import { JobSearchParams } from '@/types'
import { LoadingIcon } from '@/components'
import { SimpleJobCard } from '@/components'

const LoadMore: React.FC<JobSearchParams> = props => {
  const t = useTranslations()
  const {
    page: initialPage = 1,
    sort,
    createdAt,
    limit,
    organization,
    categories,
    salary,
    employmentType,
    education,
    language,
    location,
    locationType,
    suitableFor,
  } = props
  const [jobs, setJobs] = useState<Job[] | null>(null)
  const [page, setPage] = useState<number>(initialPage)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const handleLoadMore = async () => {
    setLoading(true)
    await fetchDocs<PaginatedDocs<Job>>('jobs', {
      limit,
      page: page + 1,
      status: 'published',
      ...(sort && { sort }),
      ...(createdAt && { createdAt }),
      ...(organization && { organization }),
      ...(categories && { categories }),
      ...(salary && { salary }),
      ...(employmentType && { employmentType }),
      ...(education && { education }),
      ...(language && { language }),
      ...(location && { location }),
      ...(locationType && { locationType }),
      ...(suitableFor?.includes('students') && { students: true }),
      ...(suitableFor?.includes('mothersOnMaternityLeave') && { mothersOnMaternityLeave: true }),
      ...(suitableFor?.includes('disabledPeople') && { disabledPeople: true }),
      ...(suitableFor?.includes('retirees') && { retirees: true }),
    }).then(data => {
      setJobs(prevJobs => (prevJobs ? [...prevJobs, ...data.docs] : data.docs))
      setPage(prevPage => prevPage + 1)
      setHasMore(data.hasNextPage)
      setLoading(false)
    })
  }

  return (
    <Fragment>
      <div className="mb-8 space-y-2">
        {jobs && jobs.map(job => <SimpleJobCard key={job.id} {...job} />)}
      </div>
      <div className="flex justify-center">
        {hasMore ? (
          <Button onClick={handleLoadMore} className="px-12" disabled={loading}>
            {t('ui.loadMore')}
            {loading && <LoadingIcon className="ml-2 size-4" />}
          </Button>
        ) : (
          <div className="text-neutral-400">{t('errors.noMoreJobs')}</div>
        )}
      </div>
    </Fragment>
  )
}

export { LoadMore }

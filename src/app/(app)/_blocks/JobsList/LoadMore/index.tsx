'use client'

import React, { Fragment, useState } from 'react'
import { Job } from '@payload-types'
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
    limit = 8,
    status = 'published',
    featured,
    organization,
    categories,
    salary,
    employmentType,
    education,
    language,
    location,
    locationType,
    students,
    mothersOnMaternityLeave,
    disabledPeople,
    retirees,
  } = props
  const [jobs, setJobs] = useState<Job[] | null>(null)
  const [page, setPage] = useState<number>(initialPage)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const handleLoadMore = async () => {
    setLoading(true)
    await fetchDocs<Job>('jobs', {
      limit,
      page: page + 1,
      sort: sort ? sort : undefined,
      createdAt: createdAt ? createdAt : undefined,
      status: status ? status : undefined,
      featured: featured ? featured : undefined,
      organization: organization ? organization : undefined,
      categories: categories ? categories : undefined,
      salary: salary ? salary : undefined,
      employmentType: employmentType ? employmentType : undefined,
      education: education ? education : undefined,
      language: language ? language : undefined,
      location: location ? location : undefined,
      locationType: locationType ? locationType : undefined,
      students: students ? students : undefined,
      mothersOnMaternityLeave: mothersOnMaternityLeave ? mothersOnMaternityLeave : undefined,
      disabledPeople: disabledPeople ? disabledPeople : undefined,
      retirees: retirees ? retirees : undefined,
    }).then(newJobs => {
      setJobs(prevJobs => (prevJobs ? [...prevJobs, ...newJobs] : newJobs))
      setPage(prevPage => prevPage + 1)
      setHasMore(newJobs.length === limit)
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
          <Button onClick={handleLoadMore} className="px-12">
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

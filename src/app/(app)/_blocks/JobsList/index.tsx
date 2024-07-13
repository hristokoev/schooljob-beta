import React, { Fragment } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { EmptyBlock } from '../EmptyBlock'
import { JobSearchParams } from '@/types'
import { LoadMore } from './LoadMore'
import { SimpleJobCard } from '@/components'
import { getCachedPayload } from '@cached-local-api'

const JobsList: React.FC<JobSearchParams> = async props => {
  const {
    loadMore = false,
    limit = 8,
    page = 1,
    sort,
    createdAt,
    status = 'published',
    featured,
    title,
    organization,
    salary,
    employmentType,
    education,
    language,
    locationType,
    students,
    mothersOnMaternityLeave,
    disabledPeople,
    retirees,
  } = props

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const cachedPayload = getCachedPayload(payload)

  const result = await cachedPayload.find({
    collection: 'jobs',
    depth: 1,
    limit,
    page,
    sort,
    where: {
      ...(status && { status: { equals: status } }),
      ...(featured && { featured: { equals: featured } }),
      ...(createdAt && { createdAt: { greater_than: createdAt } }),
      ...(title && { title: { contains: title } }),
      ...(organization && { organization: { equals: organization } }),
      ...(salary && {
        or: [
          {
            and: [
              { 'salary.enabled': { equals: true } },
              { 'salary.range': { equals: false } },
              { 'salary.base': { greater_than_equal: salary } },
            ],
          },
          {
            and: [
              { 'salary.enabled': { equals: true } },
              { 'salary.range': { equals: true } },
              { 'salary.minSalary': { greater_than_equal: salary } },
            ],
          },
        ],
      }),
      ...(employmentType && {
        employmentType: {
          all: employmentType,
        },
      }),
      ...(education && {
        education: {
          all: education,
        },
      }),
      ...(language && {
        language: {
          all: language,
        },
      }),
      ...(locationType && {
        locationType: {
          equals: locationType,
        },
      }),
      ...(students && { 'suitableFor.students': { equals: students } }),
      ...(mothersOnMaternityLeave && {
        'suitableFor.mothersOnMaternityLeave': {
          equals: mothersOnMaternityLeave,
        },
      }),
      ...(disabledPeople && {
        'suitableFor.disabledPeople': {
          equals: disabledPeople,
        },
      }),
      ...(retirees && {
        'suitableFor.retirees': {
          equals: retirees,
        },
      }),
    },
  })

  if (!result) {
    return null
  }

  const jobs = result.docs

  if (jobs.length === 0) {
    return <EmptyBlock text="No Jobs Found" />
  }

  return (
    <Fragment>
      <div className="mb-2 space-y-2">
        {jobs.map(job => (
          <SimpleJobCard key={job.id} {...job} />
        ))}
      </div>
      {loadMore && (
        <Fragment>
          {jobs.length >= limit ? (
            <LoadMore {...props} />
          ) : (
            <div className="mt-8 text-center text-neutral-400">No more jobs</div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export { JobsList }
export { JobsListSkeleton } from './Skeleton'

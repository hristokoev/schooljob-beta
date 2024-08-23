import React, { Fragment } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'

import { EmptyBlock } from '../EmptyBlock'
import { JobSearchParams } from '@/types'
import { LoadMore } from './LoadMore'
import { SimpleJobCard } from '@/components'

const JobsList: React.FC<JobSearchParams> = async props => {
  const t = await getTranslations()
  const {
    loadMore = false,
    limit = 24,
    page = 1,
    sort,
    createdAt,
    featured,
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

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const result = await payload.find({
    collection: 'jobs',
    depth: 1,
    limit,
    page,
    sort,
    where: {
      status: { equals: 'published' },
      or: [
        { ...(featured && { featured: { equals: featured } }) },
        { ...(createdAt && { createdAt: { greater_than: createdAt } }) },
        { ...(organization && { organization: { equals: organization } }) },
        {
          ...(categories && {
            categories: {
              in: categories,
            },
          }),
        },
        {
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
        },
        {
          ...(employmentType && {
            employmentType: {
              in: employmentType,
            },
          }),
        },
        {
          ...(education && {
            education: {
              in: education,
            },
          }),
        },
        {
          ...(language && {
            language: {
              in: language,
            },
          }),
        },
        {
          ...(location && {
            location: {
              in: location,
            },
          }),
        },
        {
          ...(locationType && {
            locationType: {
              in: locationType,
            },
          }),
        },
        {
          ...(suitableFor?.includes('students') && {
            'suitableFor.students': { equals: true },
          }),
        },
        {
          ...(suitableFor?.includes('mothersOnMaternityLeave') && {
            'suitableFor.mothersOnMaternityLeave': { equals: true },
          }),
        },
        {
          ...(suitableFor?.includes('disabledPeople') && {
            'suitableFor.disabledPeople': { equals: true },
          }),
        },
        {
          ...(suitableFor?.includes('retirees') && {
            'suitableFor.retirees': { equals: true },
          }),
        },
      ],
    },
  })

  if (!result) {
    return null
  }

  const jobs = result.docs

  if (jobs.length === 0) {
    return <EmptyBlock text={t('errors.noJobs')} />
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
            <div className="mt-8 text-center text-neutral-400">{t('errors.noMoreJobs')}</div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export { JobsList }
export { JobsListSkeleton } from './Skeleton'

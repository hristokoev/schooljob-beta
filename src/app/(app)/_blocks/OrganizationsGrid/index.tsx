import React, { Fragment } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'

import { LoadMore } from './LoadMore'
import { OrganizationCard } from '@/components'
import { OrganizationSearchParams } from '@/types'
import { EmptyBlock } from '../EmptyBlock'
import { getCachedPayload } from '@cached-local-api'

const OrganizationsGrid: React.FC<OrganizationSearchParams> = async props => {
  const t = await getTranslations()
  const { limit = 6, page = 1, sort, featured, loadMore = false } = props

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const cachedPayload = getCachedPayload(payload)

  const result = await cachedPayload.find({
    collection: 'organizations',
    limit,
    page,
    sort,
    where: {
      ...(featured && { featured: { equals: featured } }),
    },
  })

  if (!result) {
    return null
  }

  const organizations = result.docs

  if (organizations.length === 0) {
    return <EmptyBlock text={t('errors.noOrganizations')} />
  }

  return (
    <Fragment>
      <div className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {organizations.map(organization => (
          <div key={organization.id}>
            <OrganizationCard {...organization} />
          </div>
        ))}
      </div>
      {loadMore && <LoadMore {...props} />}
    </Fragment>
  )
}

export { OrganizationsGrid }
export { OrganizationsGridSkeleton } from './Skeleton'

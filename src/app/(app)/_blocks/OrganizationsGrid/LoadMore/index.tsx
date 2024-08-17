'use client'

import React, { Fragment, useState } from 'react'
import { Organization } from '@payload-types'
import { PaginatedDocs } from 'payload'
import { useTranslations } from 'next-intl'

import { Button, LoadingIcon, OrganizationCard } from '@/components'
import { fetchDocs } from '@/api'
import { OrganizationSearchParams } from '@/types'

const LoadMore: React.FC<OrganizationSearchParams> = props => {
  const t = useTranslations()
  const { page: initialPage = 1, limit, categories, location } = props
  const [organizations, setOrganizaions] = useState<Organization[] | null>(null)
  const [page, setPage] = useState<number>(initialPage)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const handleLoadMore = async () => {
    setLoading(true)
    await fetchDocs<PaginatedDocs<Organization>>('organizations', {
      page: page + 1,
      limit,
      ...(categories && { categories }),
      ...(location && { location }),
    }).then(newOrganizations => {
      setOrganizaions(prevOrganizations =>
        prevOrganizations
          ? [...prevOrganizations, ...newOrganizations.docs]
          : newOrganizations.docs,
      )
      setPage(prevPage => prevPage + 1)
      setHasMore(newOrganizations.hasNextPage)
      setLoading(false)
    })
  }

  return (
    <Fragment>
      <div className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {organizations &&
          organizations.map(organization => (
            <div key={organization.id}>
              <OrganizationCard {...organization} />
            </div>
          ))}
      </div>
      <div className="flex justify-center">
        {hasMore ? (
          <Button onClick={handleLoadMore} disabled={loading}>
            {t('ui.loadMore')}
            {loading && <LoadingIcon className="ml-2 size-4" />}
          </Button>
        ) : (
          <div className="text-neutral-400">{t('errors.noMoreOrganizations')}</div>
        )}
      </div>
    </Fragment>
  )
}

export { LoadMore }

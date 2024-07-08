'use client'

import React, { Fragment, useState } from 'react'

import { Button, LoadingIcon, OrganizationCard } from '@/components'
import { fetchDocs } from '@/api'
import { Organization } from '@payload-types'
import { OrganizationSearchParams } from '@/types'

const LoadMore: React.FC<OrganizationSearchParams> = props => {
  const { page: initialPage = 1, limit = 6, ...OrganizationProps } = props
  const [organizations, setOrganizaions] = useState<Organization[] | null>(null)
  const [page, setPage] = useState<number>(initialPage)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const handleLoadMore = async () => {
    setLoading(true)
    await fetchDocs<Organization>('organizations', {
      page: page + 1,
      limit,
      ...OrganizationProps,
    }).then(newOrganizations => {
      setOrganizaions(prevJobs =>
        prevJobs ? [...prevJobs, ...newOrganizations] : newOrganizations,
      )
      setPage(prevPage => prevPage + 1)
      setHasMore(newOrganizations.length === limit)
      setLoading(false)
    })
  }

  return (
    <Fragment>
      <div className="mb-8 grid grid-cols-3 gap-2">
        {organizations &&
          organizations.map(organization => (
            <div key={organization.id}>
              <OrganizationCard {...organization} />
            </div>
          ))}
      </div>
      <div className="flex justify-center">
        {hasMore ? (
          <Button onClick={handleLoadMore}>
            Load More
            {loading && <LoadingIcon className="ml-2 size-4" />}
          </Button>
        ) : (
          <div className="text-neutral-400">No more organizations</div>
        )}
      </div>
    </Fragment>
  )
}

export { LoadMore }

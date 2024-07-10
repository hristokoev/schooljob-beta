import React, { Fragment, Suspense } from 'react'
import { Metadata } from 'next'

import { Gutter, Hr, TopLabel, VerticalPadding } from '@/components'
import { OrganizationSearchParams } from '@/types'
import {
  OrganizationsGrid,
  OrganizationsGridSkeleton,
  OrganizationsSwipe,
  OrganizationsSwipeSkeleton,
  SearchBlock,
} from '@/blocks'

export const dynamic = 'force-static'

export default function Organizations({
  searchParams,
}: {
  searchParams: OrganizationSearchParams
}) {
  return (
    <Fragment>
      <VerticalPadding top="lg" bottom="lg" className="bg-white">
        <Gutter>
          <SearchBlock />
        </Gutter>
      </VerticalPadding>
      <VerticalPadding className="bg-slate-100">
        <Gutter>
          <TopLabel text="Recommended organizations" />
          <Suspense fallback={<OrganizationsSwipeSkeleton />}>
            <OrganizationsSwipe featured />
          </Suspense>
        </Gutter>
      </VerticalPadding>
      <Gutter>
        <Hr className="my-0 border-slate-300" />
      </Gutter>
      <VerticalPadding className="bg-slate-100">
        <Gutter>
          <TopLabel text="All organizations" />
          <Suspense fallback={<OrganizationsGridSkeleton count={6} />}>
            <OrganizationsGrid featured={false} loadMore {...searchParams} />
          </Suspense>
        </Gutter>
      </VerticalPadding>
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Organizations',
  description: 'Organizations page.',
}

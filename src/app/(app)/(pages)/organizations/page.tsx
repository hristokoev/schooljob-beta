import React, { Fragment, Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

import { Gutter, Hr, MinHeight, TopLabel, VerticalPadding } from '@/components'
import {
  OrganizationsGrid,
  OrganizationsGridSkeleton,
  OrganizationsSwipe,
  OrganizationsSwipeSkeleton,
} from '@/blocks'
import { OrganizationSearchParams } from '@/types'
import { parseSearchParams } from '@/utilities/parseSearchParams'
import { SearchBlock } from './SearchBlock'

export default async function Organizations({
  searchParams,
}: {
  searchParams: OrganizationSearchParams
}) {
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
        <VerticalPadding className="bg-slate-100">
          <Gutter>
            <TopLabel text={t.rich('search.results')} />
            <Suspense fallback={<OrganizationsGridSkeleton count={6} />}>
              <OrganizationsGrid
                limit={12}
                page={1}
                sort="-createdAt"
                loadMore
                {...parsedSearchParams}
              />
            </Suspense>
          </Gutter>
        </VerticalPadding>
      ) : (
        <Fragment>
          <VerticalPadding className="bg-slate-100">
            <Gutter>
              <TopLabel text={t('ui.recommendedOrganizations')} />
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
              <TopLabel text={t('ui.allOrganizations')} />
              <Suspense fallback={<OrganizationsGridSkeleton count={6} />}>
                <OrganizationsGrid
                  limit={12}
                  page={1}
                  featured={false}
                  loadMore
                  {...searchParams}
                />
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
  const t = await getTranslations({ locale, namespace: 'seo.organizations' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

import React, { Fragment, Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

import { Gutter, Hr, TopLabel, VerticalPadding } from '@/components'
import {
  OrganizationsGrid,
  OrganizationsGridSkeleton,
  OrganizationsSwipe,
  OrganizationsSwipeSkeleton,
} from '@/blocks'
import { OrganizationSearchParams } from '@/types'
import { SearchBlock } from './SearchBlock'

export const dynamic = 'force-static'

export default async function Organizations({
  searchParams,
}: {
  searchParams: OrganizationSearchParams
}) {
  const t = await getTranslations()

  return (
    <Fragment>
      <VerticalPadding className="bg-white">
        <Gutter>
          <SearchBlock />
        </Gutter>
      </VerticalPadding>
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
            <OrganizationsGrid featured={false} loadMore {...searchParams} />
          </Suspense>
        </Gutter>
      </VerticalPadding>
    </Fragment>
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

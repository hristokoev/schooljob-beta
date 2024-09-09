import React, { Fragment, Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Metadata } from 'next'

import { BannerBlock, CtaBlock, InfiniteScroll, JobsList, JobsListSkeleton } from '@/blocks'
import { Button, Gutter, TopLabel, VerticalPadding } from '@/components'
import {
  JobsSwipe,
  JobsSwipeSkeleton,
  OrganizationsGrid,
  OrganizationsGridSkeleton,
} from '@/blocks'
import { SearchBlock } from './SearchBlock'

export const dynamic = 'force-static'

export default async function Index() {
  const t = await getTranslations()

  return (
    <Fragment>
      <BannerBlock page="home" position="afterHeader" />
      <VerticalPadding>
        <Gutter className="min-h-[36dvh] md:mt-[12dvh]">
          <SearchBlock />
        </Gutter>
      </VerticalPadding>
      <VerticalPadding className="overflow-hidden bg-slate-100">
        <Gutter>
          <Suspense fallback={<JobsSwipeSkeleton />}>
            <TopLabel text={t('ui.recommendedJobs')} url="/jobs" urlText={t('ui.viewAllJobs')} />
            <JobsSwipe featured />
          </Suspense>
        </Gutter>
      </VerticalPadding>
      <BannerBlock page="home" position="afterFeaturedJobs" />
      <VerticalPadding className="bg-slate-100">
        <Gutter>
          <Suspense fallback={<JobsListSkeleton />}>
            <TopLabel text={t('ui.mostRecentJobs')} url="/jobs" urlText={t('ui.viewAllJobs')} />
            <JobsList limit={5} />
            <div className="mt-8 w-full text-center">
              <Link href="/jobs">
                <Button>{t('ui.viewAllJobs')}</Button>
              </Link>
            </div>
          </Suspense>
        </Gutter>
      </VerticalPadding>
      <VerticalPadding top="lg" bottom="lg">
        <InfiniteScroll />
      </VerticalPadding>
      <BannerBlock page="home" position="beforeOrganizations" />
      <VerticalPadding className="bg-gradient-to-b from-slate-100 to-white">
        <Gutter>
          <TopLabel
            text={t('organizations')}
            url="/organizations"
            urlText={t('ui.viewAllOrganizations')}
          />
          <Suspense fallback={<OrganizationsGridSkeleton count={6} />}>
            <OrganizationsGrid limit={6} />
            <div className="relative mt-8 w-full text-center">
              <div className="absolute bottom-8 z-10 flex h-80 w-full items-center justify-center bg-gradient-to-b from-transparent to-white">
                <Link href="/organizations" className="mt-72">
                  <Button>{t('ui.viewAllOrganizations')}</Button>
                </Link>
              </div>
            </div>
          </Suspense>
        </Gutter>
      </VerticalPadding>
      <BannerBlock page="home" position="afterOrganizations" />
      <VerticalPadding>
        <Gutter>
          <CtaBlock
            title={t('CTA.title')}
            items={[t('CTA.items.item01'), t('CTA.items.item02')]}
            content={t('CTA.content')}
            button={t('CTA.button')}
            url="/register"
          />
        </Gutter>
      </VerticalPadding>
      <BannerBlock page="home" position="beforeFooter" />
    </Fragment>
  )
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

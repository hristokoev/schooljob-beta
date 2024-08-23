import React, { Fragment, Suspense } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

import { Gutter, MinHeight, VerticalPadding } from '@/components'
import { Description } from './Description'
import { DescriptionSkeleton } from './Description/Skeleton'
import { JobsBlock } from '@/pages/organizations/[slug]/JobsBlock'
import { JobsListSkeleton } from '@/blocks'
import { ProfileBlock } from './Profile'
import { ProfileBlockSkeleton } from './Profile/Skeleton'

interface Props {
  params: {
    locale: string
    slug: string
  }
}

export default async function Organization({ params: { slug } }: Props) {
  return (
    <Fragment>
      <MinHeight className="bg-slate-100">
        <Suspense fallback={<ProfileBlockSkeleton />}>
          <ProfileBlock slug={slug} />
        </Suspense>
        <VerticalPadding className="bg-white">
          <Gutter>
            <Suspense fallback={<DescriptionSkeleton />}>
              <Description slug={slug} />
            </Suspense>
          </Gutter>
        </VerticalPadding>
        <VerticalPadding className="bg-slate-100">
          <Gutter>
            <Suspense fallback={<JobsListSkeleton count={3} />}>
              <JobsBlock slug={slug} />
            </Suspense>
          </Gutter>
        </VerticalPadding>
      </MinHeight>
    </Fragment>
  )
}

// TODO: Re-enable SSG for jobs
// export async function generateStaticParams() {
//   const payload = await getPayloadHMR({ config: configPromise })
//   const pages = await payload.find({
//     collection: 'organizations',
//     limit: 100,
//     overrideAccess: false,
//   })

//   return pages.docs?.map(({ slug }) => ({
//     slug,
//   }))
// }

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale })
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'organizations',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 0,
  })

  if (!data.docs.length) {
    return {
      title: t('notFound'),
    }
  }

  return {
    title: t('seo.organization.title', { title: data.docs[0].title }),
    description: t('seo.organization.description'),
  }
}

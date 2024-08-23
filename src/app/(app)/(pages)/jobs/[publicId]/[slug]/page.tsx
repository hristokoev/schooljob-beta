import React, { Fragment, Suspense } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

import { Gutter, VerticalPadding } from '@/components'
import { JobBlock, JobBlockSkeleton } from './JobBlock'
import { BreadcrumbBlock } from '@/blocks'

interface Props {
  params: {
    publicId: string
    slug: string
    locale: string
  }
}

export default async function Job({ params: { publicId, slug } }: Props) {
  const t = await getTranslations()
  const links = [
    {
      text: t('home'),
      href: '/',
    },
    {
      text: t('jobs'),
      href: '/jobs',
    },
  ]

  return (
    <Fragment>
      <VerticalPadding className="bg-slate-100">
        <Gutter>
          <BreadcrumbBlock links={links} current={t('ui.job')} />
          <Suspense fallback={<JobBlockSkeleton />}>
            <JobBlock publicId={publicId} slug={slug} />
          </Suspense>
        </Gutter>
      </VerticalPadding>
    </Fragment>
  )
}

// TODO: Re-enable SSG for jobs
// export async function generateStaticParams() {
//   const payload = await getPayloadHMR({ config: configPromise })
//   const pages = await payload.find({
//     collection: 'jobs',
//     limit: 100,
//     where: {
//       status: {
//         equals: 'published',
//       },
//     },
//   })

//   return pages.docs?.map(({ publicId, slug }) => ({
//     publicId: publicId?.toString() || 'job',
//     slug,
//   }))
// }

export async function generateMetadata({
  params: { locale, publicId, slug },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale })
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'jobs',
    where: {
      publicId: {
        equals: publicId,
      },
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
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
    title: t('seo.job.title', { title: data.docs[0].title }),
    description: t('seo.job.description'),
  }
}

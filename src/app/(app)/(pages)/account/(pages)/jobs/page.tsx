import React, { Fragment } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Metadata } from 'next'
import { PlusIcon } from '@heroicons/react/24/solid'

import { BreadcrumbBlock } from '@/blocks'
import { Button } from '@/components'
import { getMeUser } from '@/utilities/getMeUser'
import { JobsTableView } from './table-view'

interface Props {
  searchParams: { status: 'published' | 'unpublished' | 'expired' }
}

export default async function Jobs({ searchParams }: Props) {
  const t = await getTranslations()
  const { status } = searchParams
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      t('authentication.errors.unauthorized'),
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'jobs',
    overrideAccess: false,
    where: {
      or: [
        {
          ...(status === 'published' && {
            status: {
              equals: 'published',
            },
          }),
        },
        {
          ...(status === 'unpublished' && {
            status: {
              equals: 'unpublished',
            },
          }),
        },
        {
          ...(status === 'expired' && {
            status: {
              equals: 'expired',
            },
          }),
        },
      ],
      organization: {
        equals:
          typeof user.profile?.value === 'string' ? user.profile.value : user.profile?.value?.id,
      },
    },
    user,
    depth: 0,
  })

  const links = [
    { href: '/', text: t('home') },
    { href: '/account', text: t('account') },
  ]

  return (
    <Fragment>
      <BreadcrumbBlock links={links} current={t('jobs')} />
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 flex items-center gap-2 sm:mb-0">
          <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">{t('jobs')}</h1>
        </div>
        <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
          <Link href="/account/jobs/create" passHref>
            <Button>
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              {t('ui.createJob')}
            </Button>
          </Link>
        </div>
      </div>
      <JobsTableView docs={data.docs} />
    </Fragment>
  )
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.createJob' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

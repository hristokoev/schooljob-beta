import React, { Fragment } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'

import { BreadcrumbBlock } from '@/blocks'
import { ApplicationsTableView } from './table-view'
import { getMeUser } from '@/utilities/getMeUser'
import { Metadata } from 'next'

export default async function Jobs() {
  const t = await getTranslations()
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      t('authentication.errors.unauthorized'),
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'applications',
    overrideAccess: false,
    user,
    depth: 1,
  })

  const links = [
    { href: '/', text: t('home') },
    { href: '/account', text: t('account') },
  ]

  return (
    <Fragment>
      <BreadcrumbBlock links={links} current={t('applications')} />
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 flex items-center gap-2 sm:mb-0">
          <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">{t('applications')}</h1>
        </div>
      </div>
      <ApplicationsTableView docs={data.docs} />
    </Fragment>
  )
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.applications' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

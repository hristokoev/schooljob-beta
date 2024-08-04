import React, { Fragment } from 'react'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

import { BreadcrumbBlock } from '@/blocks'

export default async function SavedJobs() {
  const t = await getTranslations()
  const links = [
    { href: '/', text: t('home') },
    { href: '/account', text: t('account') },
  ]

  return (
    <Fragment>
      <BreadcrumbBlock links={links} current={t('savedJobs')} />
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 flex items-center gap-2 sm:mb-0">
          <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">{t('savedJobs')}</h1>
        </div>
      </div>
    </Fragment>
  )
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.savedJobs' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

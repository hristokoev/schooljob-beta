import React, { Fragment } from 'react'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

import { AccountPanel } from './AccountPanel'
import { BreadcrumbBlock } from '@/blocks'
import SettingsSidebar from '../settings-sidebar'

export default async function AccountSettings() {
  const t = await getTranslations()
  const links = [
    { href: '/', text: t('home') },
    { href: '/account', text: t('account') },
  ]

  return (
    <Fragment>
      <BreadcrumbBlock links={links} current={t('settings')} />
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 flex items-center gap-2 sm:mb-0">
          <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">{t('settings')}</h1>
        </div>
      </div>
      <div className="rounded-md border border-slate-300 bg-white">
        <div className="flex flex-col md:-mr-px md:flex-row">
          <SettingsSidebar />
          <AccountPanel />
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
  const t = await getTranslations({ locale, namespace: 'seo.settings' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

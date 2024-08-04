import React, { Fragment } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { BreadcrumbBlock } from '@/blocks'
import { Button, Gutter, MinHeight, VerticalPadding } from '@/components'
import { LogoutPage } from './LogoutPage'

export default async function Logout() {
  const t = await getTranslations()
  const links = [{ text: t('home'), href: '/' }]

  return (
    <Fragment>
      <MinHeight className="bg-slate-50">
        <VerticalPadding>
          <Gutter className="mx-auto max-w-md">
            <BreadcrumbBlock links={links} current={t('logout.title')} />
            <LogoutPage />
            <div className="mt-6 flex h-full flex-col after:flex-1">
              <div className="mx-auto w-full max-w-md rounded-md border border-slate-200 bg-white px-4 py-8">
                <div className="text-center text-sm">{t('logout.header')}</div>
                <div className="mt-6 flex justify-center gap-2">
                  <Link href="/">
                    <Button variant="link">{t('home')}</Button>
                  </Link>
                  <Link href="/login">
                    <Button>{t('login.button')}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Gutter>
        </VerticalPadding>
      </MinHeight>
    </Fragment>
  )
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.logout' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

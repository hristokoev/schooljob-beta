import React, { Fragment } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { BreadcrumbBlock } from '@/blocks'
import { Gutter, MinHeight, RenderParams, VerticalPadding } from '@/components'
import { LoginForm } from './LoginForm'
import { getMeUser } from '@/utilities/getMeUser'

export default async function Login() {
  const t = await getTranslations()
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent(t('authentication.errors.alreadyLoggedIn'))}`,
  })
  const links = [{ text: t('home'), href: '/' }]

  return (
    <Fragment>
      <MinHeight className="bg-slate-50">
        <VerticalPadding>
          <Gutter className="mx-auto max-w-md">
            <BreadcrumbBlock links={links} current={t('login.title')} />
            <RenderParams />
            <div className="mt-6 flex h-full flex-col after:flex-1">
              <div className="mx-auto w-full max-w-lg rounded-md border border-slate-300 bg-white px-4 py-8 shadow-sm">
                <h1 className="mb-6 text-center text-3xl font-bold text-slate-800">
                  {t('login.header')}
                </h1>
                <LoginForm />
                <div className="mt-6 border-t border-slate-200 pt-5">
                  <div className="text-sm">
                    {t('login.description')}
                    <Link
                      className="font-medium text-royal-blue-500 hover:text-royal-blue-400"
                      href="/register"
                    >
                      {t('register.button')}
                    </Link>
                  </div>
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
  const t = await getTranslations({ locale, namespace: 'seo.login' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

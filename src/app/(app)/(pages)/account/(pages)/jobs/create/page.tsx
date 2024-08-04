import React, { Fragment } from 'react'
import { getTranslations } from 'next-intl/server'

import { Gutter, Main } from '@/components'
import { BreadcrumbBlock } from '@/blocks'
import { JobsEditView } from '../edit-view'
import { Metadata } from 'next'

export default async function CreateJob() {
  const t = await getTranslations()
  const links = [
    { href: '/', text: t('home') },
    { href: '/account', text: t('account') },
    { href: '/account/jobs', text: t('jobs') },
  ]

  return (
    <Fragment>
      <Gutter>
        <BreadcrumbBlock links={links} current={t('ui.newJob')} />
      </Gutter>
      <Main>
        <JobsEditView status="unpublished" />
      </Main>
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

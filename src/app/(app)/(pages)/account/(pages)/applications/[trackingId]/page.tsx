import React, { Fragment } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'

import { ApplicationsEditView } from '../edit-view'
import { BreadcrumbBlock } from '@/blocks'
import { getMeUser } from '@/utilities/getMeUser'

interface Props {
  params: { trackingId: string }
}

export default async function ApplicationPage({ params }: Props) {
  const t = await getTranslations()
  const { trackingId } = params
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
    limit: 1,
    where: {
      trackingId: {
        equals: trackingId,
      },
    },
    user,
    depth: 1,
  })

  const links = [
    { href: '/', text: t('home') },
    { href: '/account', text: t('account') },
    { href: '/account/applications', text: t('applications') },
  ]

  return (
    <Fragment>
      <BreadcrumbBlock links={links} current={t('ui.applicationDetails')} />
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 flex items-center gap-2 sm:mb-0">
          <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">{t('applications')}</h1>
        </div>
      </div>
      <ApplicationsEditView {...data.docs[0]} />
    </Fragment>
  )
}

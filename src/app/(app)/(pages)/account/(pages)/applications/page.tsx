import React, { Fragment } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { BreadcrumbBlock } from '@/blocks'
import { ApplicationsTableView } from './table-view'
import { getMeUser } from '@/utilities/getMeUser'

export default async function Jobs() {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access your account.',
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
    { href: '/', text: 'Home' },
    { href: '/account', text: 'Account' },
  ]

  return (
    <Fragment>
      <BreadcrumbBlock links={links} current="Applications" />
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 flex items-center gap-2 sm:mb-0">
          <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">Applications</h1>
        </div>
      </div>
      <ApplicationsTableView docs={data.docs} />
    </Fragment>
  )
}

export const metadata = {
  title: 'Account Settings - Mosaic',
  description: 'Page description',
}

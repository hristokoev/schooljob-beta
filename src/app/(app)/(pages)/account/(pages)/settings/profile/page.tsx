import React, { Fragment } from 'react'

import SettingsSidebar from '../settings-sidebar'
import { BreadcrumbBlock } from '@/blocks'
import { CandidatePanel } from './CandidatePanel'
import { getMeUser } from '@/utilities/getMeUser'
import { OrganizationPanel } from './OrganizationPanel'

export default async function ProfileSettings() {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access your account.',
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  const links = [
    { href: '/', text: 'Home' },
    { href: '/account', text: 'Account' },
  ]

  return (
    <Fragment>
      <BreadcrumbBlock links={links} current="Settings" />
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 flex items-center gap-2 sm:mb-0">
          <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">Settings</h1>
        </div>
      </div>
      <div className="rounded-md border border-slate-300 bg-white">
        <div className="flex flex-col md:-mr-px md:flex-row">
          <SettingsSidebar />
          {user.role === 'organization' ? (
            <OrganizationPanel user={user} />
          ) : (
            <CandidatePanel user={user} />
          )}
        </div>
      </div>
    </Fragment>
  )
}

export const metadata = {
  title: 'Account Settings - Mosaic',
  description: 'Page description',
}

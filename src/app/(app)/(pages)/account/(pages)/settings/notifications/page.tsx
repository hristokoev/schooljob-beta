export const metadata = {
  title: 'Notifications Settings - Mosaic',
  description: 'Page description',
}

import React, { Fragment } from 'react'

import { BreadcrumbBlock } from '@/blocks'
import SettingsSidebar from '../settings-sidebar'
import { NotificationsPanel } from './NotificationsPanel'

export default function NotificationsSettings() {
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
          <NotificationsPanel />
        </div>
      </div>
    </Fragment>
  )
}

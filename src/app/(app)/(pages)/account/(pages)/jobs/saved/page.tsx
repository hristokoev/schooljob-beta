import React, { Fragment } from 'react'

import { BreadcrumbBlock } from '@/blocks'

interface Props {
  searchParams: { status: 'published' | 'unpublished' }
}

export default async function Jobs({ searchParams }: Props) {
  const links = [
    { href: '/', text: 'Home' },
    { href: '/account', text: 'Account' },
  ]

  return (
    <Fragment>
      <BreadcrumbBlock links={links} current="Jobs" />
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 flex items-center gap-2 sm:mb-0">
          <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">Saved Jobs</h1>
        </div>
      </div>
    </Fragment>
  )
}

export const metadata = {
  title: 'Account Settings - Mosaic',
  description: 'Page description',
}

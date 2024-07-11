import React, { Fragment } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/solid'

import { Button, Switch } from '@/components'
import { BreadcrumbBlock } from '@/blocks'
import { getMeUser } from '@/utilities/getMeUser'
import { JobsTableView } from './table-view'
import { redirect } from 'next/navigation'

interface Props {
  searchParams: { status: 'published' | 'unpublished' }
}

export default async function Jobs({ searchParams }: Props) {
  const { status } = searchParams
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access your account.',
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'jobs',
    overrideAccess: false,
    where: {
      status: {
        equals: status === 'published' ? 'published' : 'unpublished',
      },
      organization: {
        equals:
          typeof user.profile?.value === 'string' ? user.profile.value : user.profile?.value?.id,
      },
    },
    user,
    depth: 0,
  })

  const links = [
    { href: '/', text: 'Home' },
    { href: '/account', text: 'Account' },
  ]

  return (
    <Fragment>
      <BreadcrumbBlock links={links} current="Jobs" />
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 flex items-center gap-2 sm:mb-0">
          <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">Jobs</h1>
        </div>
        <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
          <Link href="/account/jobs/create" passHref>
            <Button>
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Create a Job
            </Button>
          </Link>
        </div>
      </div>
      <JobsTableView docs={data.docs} />
    </Fragment>
  )
}

export const metadata = {
  title: 'Account Settings - Mosaic',
  description: 'Page description',
}

import React, { Fragment } from 'react'
import configPromise from '@payload-config'
import { redirect } from 'next/navigation'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { ApplicationsEditView } from '../edit-view'
import { BreadcrumbBlock } from '@/blocks'
import { getMeUser } from '@/utilities/getMeUser'
import { Button, Message } from '@/components'
import { convertValue } from '@/utilities'
import Link from 'next/link'

interface Props {
  params: { trackingId: string }
  searchParams: { action: string }
}

export default async function Application({ params, searchParams }: Props) {
  const { trackingId } = params
  const { action } = searchParams
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
    limit: 1,
    where: {
      trackingId: {
        equals: trackingId,
      },
    },
    user,
    depth: 1,
  })

  if (!data.docs[0]) {
    return <Message error message="Application not found" />
  }

  const handleAction = async (status: 'pending' | 'accepted' | 'rejected' | undefined) => {
    try {
      await payload.update({
        collection: 'applications',
        id: data.docs[0].id,
        data: {
          status,
        },
        overrideAccess: false,
        user,
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (action === 'approve') {
    await handleAction('accepted')
    redirect('/account/applications')
  }

  if (action === 'reject') {
    await handleAction('rejected')
    redirect('/account/applications')
  }

  const links = [
    { href: '/', text: 'Home' },
    { href: '/account', text: 'Account' },
    { href: '/account/applications', text: 'Applications' },
  ]

  const status = data.docs[0].status

  return (
    <Fragment>
      <BreadcrumbBlock links={links} current="Application Details" />
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 flex items-center gap-2 sm:mb-0">
          <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">Applications</h1>
        </div>
        {user.role === 'organization' && (
          <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
            <Link href={`/account/applications/${trackingId}?action=approve`}>
              <Button className="bg-emerald-500 hover:bg-emerald-500/90">Approve</Button>
            </Link>
            <Link href={`/account/applications/${trackingId}?action=reject`}>
              <Button variant="destructive">Reject</Button>
            </Link>
          </div>
        )}
      </div>
      <div className="mb-8">
        <Message
          success={status === 'accepted'}
          error={status === 'rejected'}
          warning={status === 'pending'}
          message={convertValue(status)}
        />
      </div>
      <ApplicationsEditView {...data.docs[0]} />
    </Fragment>
  )
}
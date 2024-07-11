import React, { Fragment } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { Gutter, Main } from '@/components'
import { BreadcrumbBlock } from '@/blocks'
import { JobsEditView } from '../edit-view'
import { getMeUser } from '@/utilities/getMeUser'

export default async function CreateJob() {
  const { user } = await getMeUser()
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  // const jobCategories = await payload.find({
  //   collection: 'job-categories',
  //   user,
  //   depth: 0,
  // })

  const links = [
    { href: '/', text: 'Home' },
    { href: '/account', text: 'Account' },
    { href: '/account/jobs', text: 'Jobs' },
  ]

  return (
    <Fragment>
      <Gutter>
        <BreadcrumbBlock links={links} current="New Job" />
      </Gutter>
      <Main>
        <JobsEditView status="unpublished" />
      </Main>
    </Fragment>
  )
}

export const metadata = {
  title: 'Account Settings - Mosaic',
  description: 'Page description',
}

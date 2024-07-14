import React, { Fragment } from 'react'

import { JobsList } from '@/blocks'
import { Organization } from '@payload-types'
import { getDocument } from '@/utilities/getDocument'

const JobsBlock: React.FC<{ slug: string }> = async ({ slug }) => {
  const organization = (await getDocument('organizations', slug, 1)) as Organization

  if (!organization) {
    return <p>Organization not found</p>
  }

  return (
    <Fragment>
      <h4 className="mb-6 text-xl font-bold">Currently hiring at {organization.title}</h4>
      <JobsList organization={organization.id} />
    </Fragment>
  )
}

export { JobsBlock }

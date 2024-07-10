import React, { Fragment } from 'react'

import { fetchDoc } from '@/api'
import { JobsList } from '@/blocks'
import { Organization } from '@payload-types'

const JobsBlock: React.FC<{ slug: string }> = async ({ slug }) => {
  let organization: Organization | null = null

  try {
    organization = await fetchDoc<Organization>({
      collection: 'organizations',
      slug,
    })
  } catch (error) {
    console.error(error)
  }

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

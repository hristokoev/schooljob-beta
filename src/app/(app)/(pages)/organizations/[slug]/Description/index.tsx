import React, { Fragment } from 'react'

import { fetchDoc } from '@/api'
import { Organization } from '@payload-types'
import { RichText } from '@/components'

const Description: React.FC<{ slug: string }> = async ({ slug }) => {
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

  if (organization.richText)
    return (
      <Fragment>
        <h4 className="mb-2 text-xl font-bold leading-snug text-slate-800">About Us</h4>
        <RichText content={organization.richText} />
      </Fragment>
    )

  return (
    <Fragment>
      <h4 className="mb-2 text-xl font-bold leading-snug text-slate-800">About Us</h4>
      <p>
        Oh, it appears that <strong>{organization.title}</strong> has not provided any information
        about themselves yet.
      </p>
    </Fragment>
  )
}

export { Description }

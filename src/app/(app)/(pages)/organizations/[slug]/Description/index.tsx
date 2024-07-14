import React, { Fragment } from 'react'

import { Organization } from '@payload-types'
import { RichText } from '@/components'
import { getDocument } from '@/utilities/getDocument'

const Description: React.FC<{ slug: string }> = async ({ slug }) => {
  const organization = (await getDocument('organizations', slug, 1)) as Organization

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

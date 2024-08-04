import React, { Fragment } from 'react'
import { getTranslations } from 'next-intl/server'
import { Organization } from '@payload-types'

import { getDocument } from '@/utilities/getDocument'
import { JobsList } from '@/blocks'

const JobsBlock: React.FC<{ slug: string }> = async ({ slug }) => {
  const t = await getTranslations()
  const organization = (await getDocument('organizations', slug, 1)) as Organization

  if (!organization) {
    return <p>{t('errors.noOrganization')}</p>
  }

  return (
    <Fragment>
      <h4 className="mb-6 text-xl font-bold">
        {t('organization.jobs', {
          title: organization.title,
        })}
      </h4>
      <JobsList organization={organization.id} />
    </Fragment>
  )
}

export { JobsBlock }

import React, { Fragment } from 'react'
import { getTranslations } from 'next-intl/server'
import { Organization } from '@payload-types'

import { getDocument } from '@/utilities/getDocument'
import { RichText } from '@/components'

const Description: React.FC<{ slug: string }> = async ({ slug }) => {
  const t = await getTranslations()
  const organization = (await getDocument('organizations', slug, 1)) as Organization

  if (!organization) {
    return <p>{t('errors.noOrganization')}</p>
  }

  if (organization.richText)
    return (
      <Fragment>
        <h4 className="mb-6 text-xl font-bold leading-snug text-slate-800">
          {t('organization.aboutUs')}
        </h4>
        <RichText content={organization.richText} />
      </Fragment>
    )

  return (
    <Fragment>
      <h4 className="mb-6 text-xl font-bold leading-snug text-slate-800">
        {t('organization.aboutUs')}
      </h4>
      <p>
        {t.rich('organization.noDescriptionPublic', {
          title: organization.title,
          strong: chunks => <strong className="font-bold">{chunks}</strong>,
        })}
      </p>
    </Fragment>
  )
}

export { Description }

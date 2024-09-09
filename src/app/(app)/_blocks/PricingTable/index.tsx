import React, { Fragment } from 'react'
import { getTranslations } from 'next-intl/server'
import { Membership } from '@payload-types'

import { PricingCard } from './PricingCard'

const PricingTable: React.FC<{ memberships: Membership[] }> = async ({ memberships }) => {
  const t = await getTranslations()

  return (
    <Fragment>
      <div className="mx-auto grid items-start gap-8 lg:grid-cols-3 xl:max-w-none xl:gap-6">
        {memberships.map(membership => (
          <PricingCard key={membership.id} {...membership} />
        ))}
      </div>
      <div className="mt-4 text-center text-sm italic">{t('membership.note')}</div>
    </Fragment>
  )
}

export { PricingTable }

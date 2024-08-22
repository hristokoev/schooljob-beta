import { Membership } from '@payload-types'
import React from 'react'

import { PricingCard } from './PricingCard'

const PricingTable: React.FC<{ memberships: Membership[] }> = ({ memberships }) => {
  return (
    <div className="mx-auto grid items-start gap-8 lg:grid-cols-3 xl:max-w-none xl:gap-6">
      {memberships.map(membership => (
        <PricingCard key={membership.id} {...membership} />
      ))}
    </div>
  )
}

export { PricingTable }

import React, { Suspense } from 'react'

import { Gutter, Search } from '@/components'
import { useFilters } from './filters'

export const SearchBlock: React.FC = () => {
  return (
    <Gutter>
      <Suspense>
        <Search filters={useFilters()} className="grid gap-2" path="jobs" isMulti resetFilters />
      </Suspense>
    </Gutter>
  )
}

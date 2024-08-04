import React, { Suspense } from 'react'

import { Gutter, Search } from '@/components'
import { useFilters } from './filters'

export const SearchBlock: React.FC = () => {
  return (
    <Gutter className="max-w-6xl">
      <Suspense>
        <Search filters={useFilters()} path="jobs" />
      </Suspense>
    </Gutter>
  )
}

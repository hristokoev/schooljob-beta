import React, { Suspense } from 'react'

import { Gutter, Search } from '@/components'
import { filters } from './filters'

export const SearchBlock: React.FC = () => {
  return (
    <Gutter className="max-w-6xl">
      <Suspense>
        <Search filters={filters} path="jobs" />
      </Suspense>
    </Gutter>
  )
}

import React, { Fragment, Suspense } from 'react'

import { Gutter, Search, UnderlinedText } from '@/components'
import { filters } from './filters'

export const SearchBlock: React.FC = () => {
  return (
    <Gutter className="max-w-6xl">
      <div className="relative mx-auto mb-16 flex-col text-center md:flex-row md:text-left">
        <div className="">
          <h1 className="leading-2 text-4xl font-extrabold tracking-tighter">
            A job board for schools and teachers.
            <br />
            We&apos;ll help you find the <UnderlinedText>perfect job</UnderlinedText>.
          </h1>
        </div>
      </div>
      <Suspense>
        <Search filters={filters} path="jobs" />
      </Suspense>
    </Gutter>
  )
}

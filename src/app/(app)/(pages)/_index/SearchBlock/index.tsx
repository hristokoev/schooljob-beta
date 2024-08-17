import React, { Suspense } from 'react'
import { useTranslations } from 'next-intl'

import { Gutter, Search, UnderlinedText } from '@/components'
import { useFilters } from './filters'

export const SearchBlock: React.FC = () => {
  const t = useTranslations()

  return (
    <Gutter className="max-w-6xl">
      <div className="relative mx-auto mb-16 flex-col text-center md:flex-row md:text-left">
        <h1 className="leading-2 whitespace-pre-wrap text-4xl font-extrabold tracking-tighter">
          {t.rich('search.homeh1', {
            UnderlinedText: chunks => <UnderlinedText>{chunks}</UnderlinedText>,
          })}
        </h1>
      </div>
      <Suspense>
        <Search
          popup
          filters={useFilters()}
          className="grid gap-2 lg:grid-cols-6"
          path="jobs"
          showMore
        />
      </Suspense>
    </Gutter>
  )
}

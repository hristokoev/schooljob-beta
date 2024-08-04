'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import { Gutter, MinHeight, VerticalPadding } from '@/components'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const idRegex = /\/account\/jobs\/\w{24}/

  return (
    <MinHeight className="bg-slate-100">
      {!pathname.includes('/account/jobs/create') && !idRegex.test(pathname) ? (
        <VerticalPadding>
          <Gutter>{children}</Gutter>
        </VerticalPadding>
      ) : (
        <VerticalPadding bottom="none">{children}</VerticalPadding>
      )}
    </MinHeight>
  )
}

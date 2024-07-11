import React from 'react'
import { Metadata } from 'next'

import { Gutter, MinHeight, VerticalPadding } from '@/components'
import { Avatar } from './Avatar'
import { Cover } from './Cover'
import { Grid } from './Grid'
import { Header } from './Header'

export default function Account() {
  return (
    <MinHeight className="bg-slate-100">
      <Cover />
      <VerticalPadding top="none" bottom="sm" className="bg-white">
        <Gutter>
          <div className="relative">
            <div className="-mt-16 mb-6 flex justify-center sm:mb-3 md:justify-start">
              <Avatar />
            </div>
            <Header />
          </div>
        </Gutter>
      </VerticalPadding>
      <VerticalPadding bottom="lg" className="bg-slate-100">
        <Gutter>
          <Grid />
        </Gutter>
      </VerticalPadding>
    </MinHeight>
  )
}

export const metadata: Metadata = {
  title: 'Account',
  description: 'Create an account or log in to your existing account.',
}

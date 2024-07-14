import React from 'react'
import { Metadata } from 'next'

import { Button, Gutter, MinHeight, VerticalPadding } from '@/components'
import { Avatar } from './Avatar'
import { Cover } from './Cover'
import { Grid } from './Grid'
import { Header } from './Header'
import { PencilIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function Account() {
  return (
    <MinHeight className="bg-slate-100">
      <Cover />
      <VerticalPadding top="none" bottom="sm" className="bg-white">
        <Gutter>
          <div className="relative">
            <div className="-mt-16 mb-6 flex justify-center sm:mb-3 md:justify-start">
              <div className="flex w-full flex-col items-center sm:flex-row sm:items-end sm:justify-between">
                <Avatar />
                <Link href="/account/settings/profile">
                  <Button type="button" size="sm" variant="outline">
                    <PencilIcon className="h-4 w-4 shrink-0 fill-current text-slate-400" />
                    <span className="ml-2">Edit Profile</span>
                  </Button>
                </Link>
              </div>
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

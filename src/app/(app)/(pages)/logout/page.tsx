import React, { Fragment } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

import { BreadcrumbBlock } from '@/blocks'
import { Button, Gutter, MinHeight, VerticalPadding } from '@/components'
import { LogoutPage } from './LogoutPage'

export default async function Logout() {
  const links = [{ text: 'Home', href: '/' }]

  return (
    <Fragment>
      <MinHeight className="bg-slate-50">
        <VerticalPadding>
          <Gutter className="mx-auto max-w-md">
            <BreadcrumbBlock links={links} current="Log Out" />
            <LogoutPage />
            <div className="mt-6 flex h-full flex-col after:flex-1">
              <div className="mx-auto w-full max-w-md rounded-md border border-slate-200 bg-white px-4 py-8">
                <div className="text-center text-sm">Where would you like to go? </div>
                <div className="mt-6 flex justify-center gap-2">
                  <Link href="/">
                    <Button variant="link">Home Page</Button>
                  </Link>
                  <Link href="/login">
                    <Button>Log In</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Gutter>
        </VerticalPadding>
      </MinHeight>
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Logout',
  description: 'You have been logged out.',
}

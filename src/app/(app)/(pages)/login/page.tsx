import React, { Fragment } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

import { BreadcrumbBlock } from '@/blocks'
import { Gutter, MinHeight, RenderParams, VerticalPadding } from '@/components'
import { LoginForm } from './LoginForm'
import { getMeUser } from '@/utilities/getMeUser'

export default async function Login() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent('You are already logged in.')}`,
  })
  const links = [{ text: 'Home', href: '/' }]

  return (
    <Fragment>
      <MinHeight className="bg-slate-50">
        <VerticalPadding>
          <Gutter className="mx-auto max-w-md">
            <BreadcrumbBlock links={links} current="Log In" />
            <RenderParams />
            <div className="mt-6 flex h-full flex-col after:flex-1">
              <div className="mx-auto w-full max-w-lg rounded-md border border-slate-300 bg-white px-4 py-8 shadow-sm">
                <h1 className="mb-6 text-center text-3xl font-bold text-slate-800">
                  Welcome back! ✨
                </h1>
                <LoginForm />
                <div className="mt-6 border-t border-slate-200 pt-5">
                  <div className="text-sm">
                    You don&apos;t have an account?{' '}
                    <Link
                      className="font-medium text-royal-blue-500 hover:text-royal-blue-400"
                      href="/register"
                    >
                      Register
                    </Link>
                  </div>
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
  title: 'Login',
  description: 'Login to get started.',
}

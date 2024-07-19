import React, { Fragment } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

import { getMeUser } from '@/utilities/getMeUser'
import { Gutter, MinHeight, VerticalPadding } from '@/components'
import RegisterForm from './RegisterForm'

export default async function Register() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent('You are already logged in.')}`,
  })

  return (
    <Fragment>
      <MinHeight className="bg-slate-50">
        <VerticalPadding>
          <Gutter>
            <div className="mt-6 flex h-full flex-col after:flex-1">
              <section className="relative before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:h-80 before:bg-gradient-to-b before:from-zinc-100">
                <div className="px-4 sm:px-6">
                  <div className="mx-auto max-w-3xl pb-12 text-center md:pb-10">
                    <h1 className="font-inter-tight pb-4 text-4xl font-bold text-slate-800 md:text-5xl">
                      Join the Community
                    </h1>
                    <p className="text-lg text-zinc-500">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident dolorem
                      voluptatem aliquam corporis deserunt eum quas accusamus.
                    </p>
                  </div>

                  <div className="mx-auto w-full max-w-md rounded-md border border-royal-blue-300 bg-white px-4 py-8 shadow-lg shadow-royal-blue-300">
                    <h1 className="mb-6 text-center text-3xl font-bold text-slate-800">Register</h1>
                    <RegisterForm />
                    <div className="mt-6 border-t border-slate-200 pt-5">
                      <div className="text-sm">
                        Already have an account?{' '}
                        <Link
                          className="font-medium text-royal-blue-500 hover:text-royal-blue-600"
                          href="/login"
                        >
                          Log in
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </Gutter>
        </VerticalPadding>
      </MinHeight>
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register an account to get started.',
}
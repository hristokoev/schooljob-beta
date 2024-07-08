'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'

import { Button } from '@/components'
import { useAuth } from '@/providers'

const Footer: React.FC = () => {
  const { status, loading } = useAuth()

  return (
    <footer className="bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex justify-between py-6">
          <div className="flex items-center gap-5 text-white">
            <p className="text-xl font-bold">Schooljob</p>
          </div>
          {loading ? (
            <div className="h-8 w-32 animate-pulse bg-neutral-500" />
          ) : (
            <div className="flex items-center gap-2">
              {status === 'loggedIn' ? (
                <Fragment>
                  <Link href="/logout">
                    <Button variant="secondary" size="sm">
                      Log Out
                    </Button>
                  </Link>
                </Fragment>
              ) : (
                <Fragment>
                  <Link href="/login">
                    <Button variant="tertiary" size="sm">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" variant="secondary">
                      Sign Up
                    </Button>
                  </Link>
                </Fragment>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

export { Footer }

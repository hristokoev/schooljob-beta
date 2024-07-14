'use client'

import React, { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button, Gutter } from '@/components'
import Logo from '@/public/images/logo.svg'
import LogoSmall from '@/public/images/logo_s.svg'
import { useAuth } from '@/providers'

const Header: React.FC = () => {
  const { status, loading } = useAuth()
  const pathname = usePathname()

  return (
    <header className="bg-royal-blue-500">
      <Gutter>
        <div className="flex min-h-16 items-center justify-between">
          <Link href="/" className="md:hidden">
            <Image src={LogoSmall} alt="Schooljob" className="h-6 w-6" />
          </Link>
          <div className="hidden items-center text-white md:flex">
            <Link href="/">
              <Image src={Logo} alt="Schooljob" width={160} height={32} />
            </Link>
            <Link
              href="/jobs"
              className={`ml-8 px-3 py-6 transition-all duration-100 ease-in-out hover:bg-royal-blue-600 hover:text-slate-100 ${
                pathname === '/jobs' && 'bg-royal-blue-600'
              }`}
            >
              Jobs
            </Link>
            <Link
              href="/organizations"
              className={`px-3 py-6 transition-all duration-100 ease-in-out hover:bg-royal-blue-600 hover:text-slate-100 ${
                pathname === '/organizations' && 'bg-royal-blue-600'
              }`}
            >
              Organizations
            </Link>
          </div>
          {loading ? (
            <div className="h-6 w-32 animate-pulse bg-royal-blue-400" />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              {status === 'loggedIn' ? (
                <Link
                  href="/account"
                  className="px-3 py-6 text-white transition-all duration-100 ease-in-out hover:bg-royal-blue-600 hover:text-slate-100"
                >
                  My Account
                </Link>
              ) : (
                <Fragment>
                  <Link href="/login">
                    <Button size="sm" variant="outline" className="text-white">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" variant="secondary">
                      Join Us
                    </Button>
                  </Link>
                </Fragment>
              )}
            </div>
          )}
        </div>
      </Gutter>
    </header>
  )
}

export { Header }

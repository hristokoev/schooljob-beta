'use client'

import React, { Fragment, useEffect, useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button, Drawer, Gutter, Hr, Media } from '@/components'
import { cardsCandidate, cardsOrganization } from '@/pages/account/(pages)/_index/cards'
import { isCandidate, isOrganization } from '@/utilities/getRole'
import { Avatar } from '@/pages/account/(pages)/_index/Avatar'
import Logo from '@/public/images/logo.svg'
import LogoSmall from '@/public/images/logo_s.svg'
import { ProfileCardProps } from '@/pages/account/(pages)/_index/Grid/ProfileCard'
import { useAuth } from '@/providers'

const Header: React.FC = () => {
  const t = useTranslations()
  const { user, status, loading } = useAuth()
  const pathname = usePathname()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [cards, setCards] = useState<ProfileCardProps[]>([])

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  useEffect(() => {
    if (user?.role === 'candidate') {
      setCards(cardsCandidate)
    } else if (user?.role === 'organization') {
      setCards(cardsOrganization)
    }
  }, [user])

  const renderAccountContent = () => (
    <div className="flex h-full flex-col gap-2">
      {user && (
        <div className="mb-4 flex flex-col items-center bg-slate-100 px-4 py-6 sm:px-6">
          <Avatar />
          <div className="mt-4 inline-flex items-center">
            <h1 className="text-2xl font-bold text-slate-800">
              {user && isCandidate(user) && (
                <span>
                  {user.profile.value.firstName} {user.profile.value.lastName}
                </span>
              )}
              {user && isOrganization(user) && <span>{user.profile.value.title}</span>}
            </h1>
          </div>
          <span className="text-sm">
            {t(`authentication.${user?.role}` as 'authentication.user')}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2 px-4 sm:px-6">
        {user ? (
          cards.map((card, index) => (
            <Link href={card.link} key={index}>
              <Button size="lg" variant="nav" className="w-full">
                {card.header}
              </Button>
            </Link>
          ))
        ) : (
          <Fragment>
            <Link href="/login" className="md:hidden">
              <Button size="sm" variant="outline" className="w-full">
                {t('authentication.login')}
              </Button>
            </Link>
            <Link href="/register" className="md:hidden">
              <Button size="sm" className="w-full">
                {t('authentication.register')}
              </Button>
            </Link>
          </Fragment>
        )}

        <Hr className="my-4 md:hidden" />
        <Link href="/jobs" className="md:hidden">
          <Button size="lg" variant="nav" className="w-full">
            {t('jobs')}
          </Button>
        </Link>
        <Link href="/organizations" className="md:hidden">
          <Button size="lg" variant="nav" className="w-full">
            {t('organizations')}
          </Button>
        </Link>
        {user && (
          <Fragment>
            <Hr className="my-4 md:hidden" />
            <Link href="/logout">
              <Button size="lg" variant="nav" className="w-full">
                {t('authentication.logout')}
              </Button>
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  )

  return (
    <header className="sticky top-0 z-20 bg-royal-blue-500 shadow-lg shadow-royal-blue-600/5">
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
              className={`ml-8 flex h-11 items-center rounded-md px-3 py-1.5 transition-all duration-100 ease-in-out hover:bg-royal-blue-600 hover:text-slate-100 ${
                pathname === '/jobs' && 'bg-royal-blue-600'
              }`}
            >
              {t('jobs')}
            </Link>
            <Link
              href="/organizations"
              className={`flex h-11 items-center rounded-md px-3 py-1.5 transition-all duration-100 ease-in-out hover:bg-royal-blue-600 hover:text-slate-100 ${
                pathname === '/organizations' && 'bg-royal-blue-600'
              }`}
            >
              {t('organizations')}
            </Link>
          </div>
          {loading ? (
            <div className="h-6 w-32 animate-pulse bg-royal-blue-400" />
          ) : (
            <div className="flex items-center gap-2">
              {status === 'loggedIn' ? (
                <Fragment>
                  {user && isOrganization(user) && (
                    <div className="flex flex-col gap-4">
                      <Link href="/account/jobs/create">
                        <Button size="sm" variant="secondary" className="w-full">
                          {t('ui.createJob')}
                        </Button>
                      </Link>
                    </div>
                  )}
                  <Button onClick={openDrawer} className="flex items-center gap-2 text-left">
                    {user && isCandidate(user) && (
                      <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md border border-royal-blue-400 bg-royal-blue-600">
                        {user.profile.value.photo ? (
                          <Media
                            resource={user.profile.value.photo}
                            imgClassName="w-full h-full object-cover"
                          />
                        ) : (
                          user.profile.value.firstName.charAt(0).toUpperCase()
                        )}
                      </div>
                    )}
                    {user && isOrganization(user) && (
                      <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md border border-royal-blue-400 bg-royal-blue-600">
                        {user.profile.value.logo ? (
                          <Media
                            resource={user.profile.value.logo}
                            imgClassName="w-full h-full object-cover"
                          />
                        ) : (
                          user.profile.value.title.charAt(0).toUpperCase()
                        )}
                      </div>
                    )}
                    <div className="hidden flex-col sm:flex">
                      <span className="text-sm font-medium">
                        {user && isCandidate(user) && (
                          <span>
                            {user.profile.value.firstName} {user.profile.value.lastName}
                          </span>
                        )}
                        {user && isOrganization(user) && <span>{user.profile.value.title}</span>}
                      </span>
                      <span className="text-xs">
                        {t(`authentication.${user?.role}` as 'authentication.user')}
                      </span>
                    </div>
                  </Button>
                  <Drawer
                    isOpen={isDrawerOpen}
                    onClose={closeDrawer}
                    title={t('authentication.account')}
                    side="right"
                  >
                    {renderAccountContent()}
                  </Drawer>
                </Fragment>
              ) : (
                <Fragment>
                  <Link href="/login" className="hidden md:block">
                    <Button size="sm" variant="outline" className="text-white">
                      {t('authentication.login')}
                    </Button>
                  </Link>
                  <Link href="/register" className="hidden md:block">
                    <Button size="sm" variant="secondary">
                      {t('authentication.register')}
                    </Button>
                  </Link>
                  <Button
                    onClick={openDrawer}
                    className="flex items-center gap-2 text-left md:hidden"
                  >
                    <Bars3Icon className="h-6 w-6 text-white" />
                  </Button>
                  <Drawer
                    isOpen={isDrawerOpen}
                    onClose={closeDrawer}
                    title={t('seo.title')}
                    side="right"
                  >
                    {renderAccountContent()}
                  </Drawer>
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

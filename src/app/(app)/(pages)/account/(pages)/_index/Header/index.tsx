'use client'

import { GlobeEuropeAfricaIcon, LinkIcon, PhoneIcon } from '@heroicons/react/24/solid'
import React, { Fragment } from 'react'
import Link from 'next/link'
import { User } from '@payload-types'
import { useTranslations } from 'next-intl'

import { isCandidate, isOrganization } from '@/utilities'
import { cz } from '@/payload/data'
import { RichText } from '@/components'
import { useAuth } from '@/providers'

const HeaderContent: React.FC<{ user: User }> = ({ user }) => {
  const t = useTranslations()

  if (isCandidate(user)) {
    return (
      <Fragment>
        <div className="mb-2 inline-flex items-start">
          <h1 className="text-2xl font-bold text-slate-800">
            {user.profile.value.firstName} {user.profile.value.lastName}
          </h1>
        </div>
        <div className="mb-3 flex flex-wrap justify-center space-x-4 md:justify-start">
          {user.profile.value.location && (
            <div className="flex flex-wrap justify-center space-x-4 md:justify-start">
              <div className="flex items-center">
                <GlobeEuropeAfricaIcon className="h-4 w-4 shrink-0 fill-current text-slate-400" />
                <span className="ml-2 whitespace-nowrap text-sm font-medium text-slate-500">
                  {user.profile.value.location}
                </span>
              </div>
            </div>
          )}
          {user.profile.value.phone && (
            <div className="flex items-center">
              <PhoneIcon className="h-4 w-4 shrink-0 fill-current text-slate-400" />
              <span className="ml-2 whitespace-nowrap text-sm font-medium text-slate-500">
                {user.profile.value.phone}
              </span>
            </div>
          )}
        </div>
        <div className="text-sm">
          {user.profile.value.bio ? (
            <p>{user.profile.value.bio}</p>
          ) : (
            <p>
              {t('candidate.noDescriptionPrivate')}
              <Link
                href="/account/settings/profile"
                className="ml-2 font-semibold text-royal-blue-500 underline hover:no-underline"
              >
                {t('ui.edit')}
              </Link>
            </p>
          )}
        </div>
      </Fragment>
    )
  } else if (isOrganization(user)) {
    return (
      <Fragment>
        <div className="mb-2 inline-flex items-start">
          <h1 className="text-2xl font-bold text-slate-800">{user.profile.value.title}</h1>
        </div>
        <div className="mb-3 text-sm">
          {user.profile.value.richText ? (
            <RichText content={user.profile.value.richText} />
          ) : (
            <p>
              {t('organization.noDescriptionPrivate')}
              <Link
                href="/account/settings/profile"
                className="ml-2 font-semibold text-royal-blue-500 underline hover:no-underline"
              >
                {t('ui.edit')}
              </Link>
            </p>
          )}
        </div>
        <div className="flex flex-wrap justify-center space-x-4 md:justify-start">
          {user.profile.value.location?.length && (
            <div className="flex items-center">
              <GlobeEuropeAfricaIcon className="h-4 w-4 shrink-0 fill-current text-slate-400" />
              <span className="ml-2 whitespace-nowrap text-sm font-medium text-slate-500">
                {user.profile.value.location
                  .map(location => cz.find(l => l.value === location)?.label)
                  .join(', ')}
              </span>
            </div>
          )}
          {user.profile.value.phone && (
            <div className="flex items-center">
              <PhoneIcon className="h-4 w-4 shrink-0 fill-current text-slate-400" />
              <span className="ml-2 whitespace-nowrap text-sm font-medium text-slate-500">
                {user.profile.value.phone}
              </span>
            </div>
          )}
          {user.profile.value.url && (
            <div className="flex items-center">
              <LinkIcon className="h-4 w-4 shrink-0 fill-current text-slate-400" />
              <a
                className="ml-2 whitespace-nowrap text-sm font-medium text-royal-blue-500 hover:text-royal-blue-400"
                href={user.profile.value.url}
              >
                {user.profile.value.url}
              </a>
            </div>
          )}
        </div>
        {user.profile.value.vatId && (
          <span className="whitespace-nowrap text-sm font-medium text-slate-500">
            {t('organization.vatId')}: {user.profile.value.vatId}
          </span>
        )}
      </Fragment>
    )
  } else {
    return null
  }
}

const Header: React.FC = () => {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-2 md:items-start">
        <div className="h-7 w-64 bg-slate-200" />
        <div className="h-5 w-96 bg-slate-200" />
        <div className="h-5 w-48 bg-slate-200" />
        <div className="flex gap-2">
          <div className="h-5 w-32 rounded-md bg-slate-200"></div>
          <div className="h-5 w-24 rounded-md bg-slate-200"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="-ml-1 -mt-1 mb-4 flex flex-col items-center md:mb-0 md:flex-row md:items-end md:justify-between">
      <header className="mb-6 text-center md:text-left">
        <HeaderContent user={user} />
      </header>
    </div>
  )
}

export { Header }

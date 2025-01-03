/*
  Similar to '@src\app\(app)\(pages)\account\(pages)\_index\Avatar\index.tsx'

  TODO: Make this component reusable
*/

import { GlobeEuropeAfricaIcon, LinkIcon, PhoneIcon } from '@heroicons/react/24/solid'
import React, { Fragment } from 'react'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Organization } from '@payload-types'

import { Gutter, Media, VerticalPadding } from '@/components'
import { cz } from '@/payload/data'
import { getDocument } from '@/utilities/getDocument'

const NoAvatar: React.FC<{ letter: string }> = ({ letter }) => (
  <div className="-ml-1 -mt-1 mb-4 inline-flex rounded-md shadow-md sm:mb-0">
    <div className="shadow-m overflow-hidden rounded-md border-4 border-white bg-royal-blue-300">
      <div className="flex size-32 flex-none items-center justify-center bg-royal-blue-500 text-7xl font-bold text-white md:size-40 md:text-9xl">
        {letter.toUpperCase()}
      </div>
    </div>
  </div>
)

const ProfileBlock: React.FC<{ slug: string }> = async ({ slug }) => {
  const t = await getTranslations()
  const organization = (await getDocument('organizations', slug, 1)) as Organization

  if (!organization) {
    notFound()
  }

  return (
    <Fragment>
      <div className="relative h-56 bg-slate-200">
        {organization.imageCover ? (
          <Fragment>
            <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-b from-transparent via-transparent via-70% to-slate-300/30"></div>
            <Media
              resource={organization.imageCover}
              className="h-full w-full"
              imgClassName="h-full w-full object-cover object-center "
            />
          </Fragment>
        ) : (
          <div className="relative h-56 bg-royal-blue-200" />
        )}
      </div>
      <VerticalPadding top="none" bottom="sm" className="bg-slate-100">
        <Gutter>
          <div className="relative z-10">
            <div className="-mt-16 mb-6 flex justify-center md:mb-3 md:justify-start">
              <Fragment>
                {organization.logo ? (
                  <Media
                    resource={organization.logo}
                    className="h-40 w-40 overflow-hidden rounded-md border-2 border-white bg-white shadow-md"
                    imgClassName="rounded-md border-2 border-white shadow-md"
                  />
                ) : (
                  <NoAvatar letter={organization.title.slice(0, 1)} />
                )}
              </Fragment>
            </div>
            <div className="-ml-1 -mt-1 mb-4 flex flex-col items-center md:mb-0 md:flex-row md:items-end md:justify-between">
              <header className="mb-6 text-center md:text-left">
                <div className="mb-2 inline-flex items-start">
                  <h1 className="text-2xl font-bold text-slate-800">{organization.title}</h1>
                </div>
                <div className="mb-2 flex flex-wrap justify-center space-x-4 md:justify-start">
                  {organization.location && organization.location.length > 0 && (
                    <div className="flex items-center">
                      <GlobeEuropeAfricaIcon className="h-4 w-4 shrink-0 fill-current text-slate-400" />
                      <span className="ml-2 whitespace-nowrap text-sm font-medium text-slate-500">
                        {organization.location
                          .map(location => cz.find(l => l.value === location)?.label)
                          .join(', ')}
                      </span>
                    </div>
                  )}
                  {organization.phone && (
                    <div className="flex items-center">
                      <PhoneIcon className="h-4 w-4 shrink-0 fill-current text-slate-400" />
                      <span className="ml-2 whitespace-nowrap text-sm font-medium text-slate-500">
                        {organization.phone}
                      </span>
                    </div>
                  )}
                  {organization.url && (
                    <div className="flex items-center">
                      <LinkIcon className="h-4 w-4 shrink-0 fill-current text-slate-400" />
                      <a
                        className="ml-2 whitespace-nowrap text-sm font-medium text-royal-blue-500 hover:text-royal-blue-400"
                        href={organization.url}
                      >
                        {organization.url}
                      </a>
                    </div>
                  )}
                </div>
                <span className="whitespace-nowrap text-sm font-medium text-slate-500">
                  {t('organization.vatId')}: {organization.vatId}
                </span>
              </header>
            </div>
          </div>
        </Gutter>
      </VerticalPadding>
    </Fragment>
  )
}

export { ProfileBlock }

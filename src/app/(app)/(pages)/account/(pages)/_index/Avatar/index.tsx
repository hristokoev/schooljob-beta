/*
  Similar to '@src\app\(app)\(pages)organizations\[slug]\Profile\index.tsx'

  TODO: Make this component reusable
*/

'use client'

import React, { Fragment } from 'react'

import { isCandidate, isOrganization } from '@/utilities'
import { Media } from '@/components'
import { useAuth } from '@/providers'

const NoAvatar: React.FC<{ letter: string }> = ({ letter }) => (
  <div className="-ml-1 -mt-1 mb-4 inline-flex rounded-md border-2 sm:mb-0">
    <div className="shadow-m border-2 border-white bg-royal-blue-300">
      <div className="flex size-32 flex-none items-center justify-center rounded-md bg-royal-blue-500 text-7xl font-bold text-white md:size-40 md:text-9xl">
        {letter.toUpperCase()}
      </div>
    </div>
  </div>
)

const Avatar: React.FC = () => {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="-ml-1 -mt-1 mb-4 inline-flex overflow-hidden rounded-md bg-white sm:mb-0">
        <div className="shadow-m h-40 w-40 animate-pulse border-2 border-white bg-gradient-to-t from-royal-blue-200 to-royal-blue-300" />
      </div>
    )
  }

  return (
    <div className="-ml-1 -mt-1 mb-4 inline-flex sm:mb-0">
      {isCandidate(user) && (
        <Fragment>
          {user.profile.value.photo ? (
            <Media
              resource={user.profile.value.photo}
              className="h-40 w-40 overflow-hidden rounded-md border-2 border-white bg-white shadow-md"
              imgClassName="rounded-md border-2 border-white shadow-md"
            />
          ) : (
            <NoAvatar letter={user.profile.value.firstName.slice(0, 1)} />
          )}
        </Fragment>
      )}
      {isOrganization(user) && (
        <Fragment>
          {user.profile.value.logo ? (
            <Media
              resource={user.profile.value.logo}
              className="h-40 w-40 overflow-hidden rounded-md border-2 border-white bg-white shadow-md"
              imgClassName="rounded-md border-2 border-white shadow-md"
            />
          ) : (
            <NoAvatar letter={user.profile.value.title.slice(0, 1)} />
          )}
        </Fragment>
      )}
    </div>
  )
}

export { Avatar }

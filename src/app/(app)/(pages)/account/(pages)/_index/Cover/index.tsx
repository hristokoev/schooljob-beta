'use client'

import React, { Fragment } from 'react'

import { isCandidate, isOrganization } from '@/utilities'
import { Media } from '@/components'
import { useAuth } from '@/providers'

const NoCover: React.FC = () => <div className="relative h-56 bg-royal-blue-200" />

const Cover: React.FC = () => {
  const { user } = useAuth()

  if (!user) return <div className="relative h-56 animate-pulse bg-royal-blue-200" />

  return (
    <div className="relative h-56 bg-slate-200">
      {isOrganization(user) && (
        <Fragment>
          {user.profile.value.imageCover ? (
            <Media
              resource={user.profile.value.imageCover}
              className="h-full w-full"
              imgClassName="h-full w-full object-cover object-center"
            />
          ) : (
            <NoCover />
          )}
        </Fragment>
      )}
      {isCandidate(user) && <NoCover />}
    </div>
  )
}

export { Cover }

import React, { Fragment } from 'react'

import { Gutter, VerticalPadding } from '@/components'

const ProfileBlockSkeleton: React.FC = () => {
  return (
    <Fragment>
      <div className="relative h-56 animate-pulse bg-royal-blue-200" />
      <VerticalPadding top="none" className="bg-slate-100">
        <Gutter>
          <div className="relative">
            <div className="-mt-16 mb-6 flex justify-center sm:mb-3 md:justify-start">
              <div className="-ml-1 -mt-1 mb-4 inline-flex overflow-hidden rounded-md border-2 border-white bg-white sm:mb-0">
                <div className="shadow-m h-40 w-40 animate-pulse bg-gradient-to-t from-royal-blue-200 to-royal-blue-300" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 md:items-start">
              <div className="h-7 w-64 bg-slate-200" />
              <div className="flex gap-2">
                <div className="h-5 w-32 rounded-md bg-slate-200"></div>
                <div className="h-5 w-24 rounded-md bg-slate-200"></div>
              </div>
            </div>
          </div>
        </Gutter>
      </VerticalPadding>
    </Fragment>
  )
}

export { ProfileBlockSkeleton }

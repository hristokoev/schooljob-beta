import React, { Fragment } from 'react'

interface JobsListSkeletonProps {
  count?: number
}

const JobsListSkeleton: React.FC<JobsListSkeletonProps> = ({ count = 3 }) => {
  return (
    <Fragment>
      <div className="mb-4 flex animate-pulse justify-between">
        <div className="h-5 w-56 bg-slate-200" />
        <div className="h-5 w-36 bg-slate-200" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, index) => (
          <div className="flex h-full animate-pulse gap-5 bg-white p-5" key={index}>
            <div className="flex h-20 w-20 items-center justify-center rounded-md bg-slate-300" />
            <div className="space-y-2">
              <div className="h-5 w-56 bg-slate-200" />
              <div className="flex gap-2">
                <div className="h-5 w-20 rounded-full bg-slate-200"></div>
                <div className="h-5 w-16 rounded-full bg-slate-200"></div>
              </div>
              <div className="h-5 w-20 rounded-full bg-slate-200"></div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

export { JobsListSkeleton }

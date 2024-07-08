import React, { Fragment } from 'react'

interface OrganizationsGridSkeletonProps {
  count?: number
}

const OrganizationsGridSkeleton: React.FC<OrganizationsGridSkeletonProps> = ({ count = 3 }) => {
  return (
    <Fragment>
      <div className="mb-4 flex animate-pulse justify-between">
        <div className="h-5 w-56 bg-slate-200" />
        <div className="h-5 w-36 bg-slate-200" />
      </div>
      <div className="mb-2 grid grid-cols-3 gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <div className="animate-pulse overflow-hidden rounded-md bg-white" key={index}>
            <div className="flex flex-col">
              <div className="h-32 bg-slate-300" />
              <div className="flex flex-col gap-2 justify-self-end p-5">
                <div className="-mt-12 mb-2 h-16 w-16 rounded-md bg-slate-400" />
                <div className="h-6 bg-slate-200" />
                <div className="h-6 bg-slate-200" />
                <div className="h-12 bg-slate-200" />
                <div className="flex gap-2">
                  <div className="h-5 w-32 rounded-full bg-slate-200"></div>
                  <div className="h-5 w-24 rounded-full bg-slate-200"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

export { OrganizationsGridSkeleton }

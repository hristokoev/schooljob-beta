import React from 'react'

const ProfileCardSkeleton: React.FC = () => {
  return (
    <div className="col-span-full animate-pulse rounded-md border border-slate-200 bg-white sm:col-span-6 xl:col-span-4">
      <div className="flex h-full flex-col p-5">
        <header>
          <div className="rounded-md bg-slate-200 px-4 py-3">
            <h3 className="ml-3">&nbsp;</h3>
          </div>
        </header>
        <div className="mt-4 grow">
          <div className="mb-2">
            <div className="w-1/2 bg-slate-200">&nbsp;</div>
          </div>
          <div className="w-2/3 bg-slate-200">&nbsp;</div>
        </div>
      </div>
    </div>
  )
}

export { ProfileCardSkeleton }

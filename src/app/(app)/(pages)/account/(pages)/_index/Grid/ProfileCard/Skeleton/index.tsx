import React from 'react'

const ProfileCardSkeleton: React.FC = () => {
  return (
    <div className="col-span-full h-20 w-full animate-pulse rounded-md border border-slate-200 bg-white sm:col-span-6 xl:col-span-4" />
  )
}

export { ProfileCardSkeleton }

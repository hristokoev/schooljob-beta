import React from 'react'

const DescriptionSkeleton: React.FC = () => {
  return (
    <div className="space-y-2">
      <div className="h-7 w-32 bg-slate-200" />
      <div className="h-5 bg-slate-200" />
      <div className="h-5 w-1/2 bg-slate-200" />
    </div>
  )
}

export { DescriptionSkeleton }

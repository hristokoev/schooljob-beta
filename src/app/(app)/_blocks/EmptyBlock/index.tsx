import React from 'react'

const EmptyBlock: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <div className="w-full rounded-md border border-slate-300 bg-white py-40">
      <p className="text-center text-2xl font-bold">{text}</p>
    </div>
  )
}

export { EmptyBlock }

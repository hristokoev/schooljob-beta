'use client'

import React from 'react'

import { InfiniteScrollLogo } from '@/components'
import { logos } from './logos'

const InfiniteScroll: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <div className="pb-24 text-center">
        <h2 className="mb-4 font-medium text-slate-800">Our Partners</h2>
      </div>
      <div className="group mx-auto space-y-6">
        <div className="inline-flex w-full flex-nowrap">
          <div className="flex animate-infinite-scroll items-center justify-center group-hover:[animation-play-state:paused] md:justify-start">
            {logos.map((logos, index) => (
              <InfiniteScrollLogo key={index} {...logos}></InfiniteScrollLogo>
            ))}
          </div>
          <div
            className="flex animate-infinite-scroll items-center justify-center group-hover:[animation-play-state:paused] md:justify-start"
            aria-hidden="true"
          >
            {logos.map((logos, index) => (
              <InfiniteScrollLogo key={index} {...logos}></InfiniteScrollLogo>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { InfiniteScroll }

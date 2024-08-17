import { Logo } from '@payload-types'
import React from 'react'

import { Media } from '../Media'

const InfiniteScrollLogo: React.FC<Logo> = (logo: Logo) => {
  return (
    <div className="group flex w-[12rem] items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 md:min-w-[24rem]">
      <div className="flex items-center justify-center">
        <Media
          className="w-full grayscale transition-all duration-150 ease-in-out group-hover:grayscale-0"
          resource={logo}
        />
      </div>
    </div>
  )
}

export { InfiniteScrollLogo }

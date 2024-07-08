import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface InfiniteScrollLogoProps {
  image: StaticImageData
  alt: string
  width: number
  height: number
}

const InfiniteScrollLogo: React.FC<InfiniteScrollLogoProps> = ({ image, alt, width, height }) => {
  return (
    <div className="group flex w-[12rem] items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 md:min-w-[24rem]">
      <div className="flex items-center justify-center">
        <Image
          className="w-full grayscale transition-all duration-150 ease-in-out group-hover:grayscale-0"
          src={image}
          width={width}
          height={height}
          alt={alt}
        />
      </div>
    </div>
  )
}

export { InfiniteScrollLogo }

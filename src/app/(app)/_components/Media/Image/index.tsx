'use client'

import NextImage, { StaticImageData } from 'next/image'
import React from 'react'

import { Props as MediaProps } from '../types'

export const Image: React.FC<MediaProps> = props => {
  const {
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    resource,
    priority,
    fill,
    src: srcFromProps,
    alt: altFromProps,
  } = props

  const [isLoading, setIsLoading] = React.useState(true)

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource !== 'string') {
    const { width: fullWidth, height: fullHeight, filename: fullFilename, url: fullUrl } = resource

    width = fullWidth ?? undefined
    height = fullHeight ?? undefined
    alt = fullFilename ?? undefined

    const filename = fullFilename

    src = `${process.env.NEXT_PUBLIC_SERVER_URL}${fullUrl}`
  }

  return (
    <NextImage
      className={`${isLoading ? 'opacity-0' : 'opacity-100'} ${imgClassName}`}
      src={src}
      alt={alt || ''}
      onClick={onClick}
      onLoad={() => {
        setIsLoading(false)

        if (typeof onLoadFromProps === 'function') {
          onLoadFromProps()
        }
      }}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      priority={priority}
    />
  )
}

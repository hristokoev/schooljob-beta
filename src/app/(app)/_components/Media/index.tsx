import React, { Fragment } from 'react'

import { Image } from './Image'
import { Props } from './types'

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div' } = props

  const Tag = htmlElement || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      <Image {...props} alt="" />
    </Tag>
  )
}

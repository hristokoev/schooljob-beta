import React from 'react'

import { cn } from '@/utilities/cn'
import { serializeLexical } from './serialize'

import './style.scss'

type Props = {
  className?: string
  content: any
  enableProse?: boolean
}

const RichText: React.FC<Props> = ({ className, content, enableProse = true }) => {
  if (!content) {
    return null
  }

  return (
    <div
      className={cn(
        {
          'prose max-w-5xl space-y-1': enableProse,
        },
        className,
      )}
    >
      {content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content &&
        serializeLexical({ nodes: content?.root?.children })}
    </div>
  )
}

export { RichText }

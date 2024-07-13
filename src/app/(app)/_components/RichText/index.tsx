import { cn } from '@/utilities/cn'
import React from 'react'

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
          'prose mx-auto space-y-3': enableProse,
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
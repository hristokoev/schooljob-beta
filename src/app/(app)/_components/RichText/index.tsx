import React from 'react'

import { serializeLexical } from './serialize'

type Props = {
  className?: string
  content: any
}

const RichText: React.FC<Props> = ({ content }) => {
  if (!content) {
    return null
  }

  return (
    <div className="prose max-w-5xl space-y-1">
      {content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content &&
        serializeLexical({ nodes: content?.root?.children })}
    </div>
  )
}

export { RichText }

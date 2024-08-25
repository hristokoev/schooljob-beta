import Link from 'next/link'
import React from 'react'

import { Button } from '@/components'

type Props = {
  text?: string
} & (
  | {
      url: string
      urlText: string
    }
  | {
      url?: undefined
      urlText?: undefined
    }
)

const TopLabel: React.FC<Props> = ({ text, url, urlText }) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      {text && <span className="items-center font-medium text-slate-800">{text}</span>}
      {url && urlText && (
        <Link href={url} className="group inline-flex items-center font-medium text-slate-800">
          <Button variant="link">{urlText}</Button>
        </Link>
      )}
    </div>
  )
}

export { TopLabel }

import { Button, type ButtonProps } from '@/components'
import { cn } from '@/utilities'
import Link from 'next/link'
import React from 'react'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string
  newTab?: boolean
  size?: ButtonProps['size']
  url?: string
}

const CMSLink: React.FC<CMSLinkType> = props => {
  const {
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    size: sizeFromProps,
    url,
  } = props

  if (!url) return null

  const size = appearance === 'link' ? undefined : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link
        className={cn(['font-medium text-royal-blue-500 underline hover:no-underline', className])}
        href={url}
        {...newTabProps}
      >
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={url} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}

export { CMSLink }

import React from 'react'

import { cn } from '@/utilities/cn'

interface GutterProps {
  left?: boolean
  right?: boolean
  className?: string
  children: React.ReactNode
}

const Gutter = React.forwardRef<HTMLDivElement, GutterProps>(
  ({ className, children, ...props }, ref) => {
    const { left = true, right = true } = props

    return (
      <div
        className={cn(
          'mx-auto max-w-7xl',
          {
            'pl-4': left,
            'pr-4': right,
          },
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Gutter.displayName = 'Gutter'

export { Gutter }

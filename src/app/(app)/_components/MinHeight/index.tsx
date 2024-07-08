import React from 'react'

import { cn } from '@/utilities'

const MinHeight = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn('min-h-[100vh]', className)} ref={ref} {...props}>
        {children}
      </div>
    )
  },
)

MinHeight.displayName = 'MinHeight'

export { MinHeight }

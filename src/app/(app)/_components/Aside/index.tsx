import React from 'react'

import { cn } from '@/utilities'

const Aside = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'article'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <aside className={cn('space-y-4 md:col-start-4', className)} ref={ref} {...props}>
        {children}
      </aside>
    )
  },
)

Aside.displayName = 'Aside'

export { Aside }

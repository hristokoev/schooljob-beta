import React from 'react'

import { cn } from '@/utilities'

const Main = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'main'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <main className={cn('mt-6', className)} ref={ref} {...props}>
        {children}
      </main>
    )
  },
)

Main.displayName = 'Main'

export { Main }

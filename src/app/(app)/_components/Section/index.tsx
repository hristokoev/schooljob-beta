import React from 'react'

import { cn } from '@/utilities'

const Section = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'section'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <section className={cn('md:col-span-3', className)} ref={ref} {...props}>
        {children}
      </section>
    )
  },
)

Section.displayName = 'Section'

export { Section }

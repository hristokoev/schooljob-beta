import React from 'react'

import { cn } from '@/utilities'

const Article = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'article'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <article
        className={cn('grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-1', className)}
        ref={ref}
        {...props}
      >
        {children}
      </article>
    )
  },
)

Article.displayName = 'Article'

export { Article }

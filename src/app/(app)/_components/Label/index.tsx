import React from 'react'

import { cn } from '@/utilities/cn'

const Label = React.forwardRef<HTMLLabelElement, React.ComponentPropsWithoutRef<'label'>>(
  ({ className, ...props }, ref) => (
    <label
      className={cn(
        'mb-1 block text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
)

Label.displayName = 'Label'

export { Label }

import React from 'react'

import { cn } from '@/utilities'

const Hr = React.forwardRef<HTMLHRElement, React.ComponentPropsWithoutRef<'hr'>>(
  ({ className, ...props }, ref) => {
    return <hr className={cn('my-6 border-t border-slate-200', className)} ref={ref} {...props} />
  },
)

Hr.displayName = 'Hr'

export { Hr }

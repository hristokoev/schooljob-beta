import React from 'react'

import { cn } from '@/utilities'

const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          'px-3 py-2',
          'border border-slate-300 bg-slate-50 hover:border-royal-blue-300',
          'focus:border-royal-blue-500 focus:shadow-sm focus:shadow-royal-blue-500/25 focus:ring-1 focus:ring-offset-0',
          'disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400 disabled:opacity-50',
          'text-sm leading-5 text-slate-800',
          '!outline-none',
          'rounded',
          'transition-all duration-150 ease-in-out',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }

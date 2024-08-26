import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '@/utilities'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-royal-blue-500 hover:bg-royal-blue-600 text-white',
        destructive: 'bg-red-500 text-white hover:bg-red-500/90',
        outline:
          'border border-slate-200 hover:border-slate-300 hover:bg-slate-300/10 text-royal-blue-500 shadow-md shadow-black/10',
        ghost: 'bg-transparent',
        link: 'text-md text-primary underline-offset-4 hover:underline',
        secondary: 'bg-white hover:bg-slate-200',
        tertiary: 'border-slate-200 hover:bg-white text-white hover:text-black',
        nav: 'border border-slate-300 hover:border-slate-400 bg-slate-50 text-slate-800',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        none: 'h-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'variant'>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)

Button.displayName = 'Button'

export { Button, type ButtonProps }

import React from 'react'

export type VerticalPaddingOptions = 'lg' | 'md' | 'sm' | 'none'

type VerticalPaddingProps = {
  top?: VerticalPaddingOptions
  bottom?: VerticalPaddingOptions
  children: React.ReactNode
  className?: string
}

const VerticalPadding: React.FC<VerticalPaddingProps> = ({
  top = 'md',
  bottom = 'md',
  className,
  children,
}) => {
  const getPaddingClass = (size: VerticalPaddingOptions, position: 'top' | 'bottom') => {
    const sizeMap = {
      lg: position === 'top' ? 'pt-32' : 'pb-32',
      md: position === 'top' ? 'pt-20' : 'pb-20',
      sm: position === 'top' ? 'pt-12' : 'pb-12',
      none: '0',
    }

    return sizeMap[size]
  }

  return (
    <div
      className={[getPaddingClass(top, 'top'), getPaddingClass(bottom, 'bottom'), className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}

export { VerticalPadding }

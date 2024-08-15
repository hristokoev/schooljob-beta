import React from 'react'

interface Props {
  children: React.ReactNode
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'orange' | 'gray'
  size?: 'sm' | 'md' | 'lg'
}

const Pill: React.FC<Props> = ({ children, color, size }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
    orange: 'bg-orange-100 text-orange-600',
    gray: 'bg-slate-200 text-slate-600',
  }
  const sizes = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-1.5 py-0.5',
    lg: 'text-sm px-2.5 py-1.5',
  }

  return (
    <div>
      <span
        className={`inline-flex text-nowrap rounded-full px-1.5 py-0.5 text-center text-xs font-medium ${
          color ? colors[color] : colors.gray
        } ${size ? sizes[size] : sizes.md}`}
      >
        {children}
      </span>
    </div>
  )
}

export { Pill }

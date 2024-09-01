'use client'

import React, { ReactNode, useEffect, useState } from 'react'

interface CheckboxProps {
  name: string
  label?: string | ReactNode
  value?: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
  required?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ name, label, value = true, onChange, disabled, required }, ref) => {
    const [isActive, setIsActive] = useState<boolean>(value)

    const handleChange = () => {
      const newValue = !isActive
      setIsActive(newValue)

      if (onChange) {
        onChange(newValue)
      }
    }

    useEffect(() => {
      setIsActive(value)
    }, [value])

    return (
      <div className="flex items-center gap-2">
        <div className="form-checkbox">
          <input
            type="checkbox"
            id={name}
            className="sr-only"
            checked={isActive}
            onChange={handleChange}
            ref={ref}
            disabled={disabled}
          />
          <label htmlFor={name}>
            <span aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </span>
            {typeof label === 'string' && <span className="sr-only">{label}</span>}
          </label>
        </div>
        {typeof label === 'string' ? (
          <label htmlFor={name} className="text-sm font-medium text-slate-900">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        ) : (
          <label className="text-sm font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }

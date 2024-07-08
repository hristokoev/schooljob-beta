'use client'

import React, { useState, useEffect } from 'react'

interface CheckboxProps {
  name: string
  label?: string
  value?: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ name, label, value = true, onChange, disabled }, ref) => {
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
            <span className="sr-only">{label}</span>
          </label>
        </div>
        <div className="mr-2 text-sm italic text-slate-400">{label}</div>
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }

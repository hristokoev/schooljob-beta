'use client'

import React, { useState, useEffect } from 'react'

interface SwitchProps {
  name: string
  onText?: string
  offText?: string
  value?: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
}

const Switch: React.FC<SwitchProps> = ({
  name,
  onText = 'On',
  offText = 'Off',
  value = true,
  onChange,
  disabled,
}) => {
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
      <div className="form-switch">
        <input
          type="checkbox"
          id={name}
          className="sr-only"
          checked={isActive}
          onChange={handleChange}
          disabled={disabled}
        />
        <label htmlFor={name}>
          <span className="bg-white shadow-sm" aria-hidden="true"></span>
          <span className="sr-only">{isActive ? onText : offText}</span>
        </label>
      </div>
      <div className="mr-2 text-sm italic text-slate-400">{isActive ? onText : offText}</div>
    </div>
  )
}

export { Switch }

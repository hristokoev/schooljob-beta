'use client'

import React, { useEffect, useState } from 'react'
import ReactSelect from 'react-select'

const MultiSelect = React.forwardRef<
  React.ComponentRef<typeof ReactSelect>,
  React.ComponentProps<typeof ReactSelect>
>(({ isMulti, multiOptions, placeholder, isDisabled, ...props }, ref) => {
  const [isClient, setIsClient] = useState(false)

  // Wait for hydration to finish before rendering the component
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="animate-pulse rounded border border-slate-300 bg-slate-50 px-3 py-2 text-sm leading-5 text-slate-400">
        Loading...
      </div>
    )
  }

  return (
    <ReactSelect
      isMulti={isMulti}
      unstyled
      options={multiOptions}
      placeholder={placeholder || ''}
      classNames={{
        menu: () => 'my-2 rounded-sm overflow-hidden shadow-lg border',
        control: () =>
          `px-3 py-2 border border-slate-300 bg-slate-50 hover:border-royal-blue-300 focus:border-royal-blue-500 focus:shadow-sm focus:shadow-royal-blue-500/25 focus:ring-1 focus:ring-offset-0 text-sm leading-5 text-slate-800 !outline-none rounded transition-all duration-150 ease-in-out aria-[disabled="true"]:opacity-50`,
        option: () =>
          'flex items-center w-full py-2 px-3 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-700 cursor-pointer',
        multiValue: () => {
          return 'inline-flex cursor-pointer items-center rounded-sm border border-royal-blue-600 bg-royal-blue-100 px-1.5 py-0.5 text-center text-xs font-medium text-royal-blue-600 hover:bg-royal-blue-200'
        },
        clearIndicator: () => 'bg-royal-blue-500 text-white rounded-full mr-1 cursor-pointer',
        noOptionsMessage: () => {
          return 'bg-white py-2 text-slate-400 text-sm font-medium'
        },
        placeholder: () => 'line-clamp-1',
        valueContainer: () => 'flex flex-nowrap gap-2',
      }}
      isDisabled={isDisabled}
      ref={ref}
      {...props}
    />
  )
})

MultiSelect.displayName = 'MultiSelect'

export { MultiSelect as Select }

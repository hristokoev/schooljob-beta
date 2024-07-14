'use client'

import React from 'react'
import ReactSelect from 'react-select'

const MultiSelect = React.forwardRef<
  React.ComponentRef<typeof ReactSelect>,
  React.ComponentProps<typeof ReactSelect>
>(({ isMulti, multiOptions, placeholder, isDisabled, ...props }, ref) => {
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
          return 'inline-flex rounded-full px-1.5 text-center text-xs font-medium bg-royal-blue-100 text-royal-blue-600 text-xs px-1.5 py-0.5 border border-royal-blue-600'
        },
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

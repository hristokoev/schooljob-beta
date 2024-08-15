'use client'

import { CustomComponent } from 'payload'
import React from 'react'
import { useField } from '@payloadcms/ui'

import './index.scss'

export const StatusSelectField: CustomComponent = ({ path }) => {
  const { value, setValue } = useField<string>(path)

  const baseClass =
    'p-4 mb-8 flex justify-center items-center h-full w-full rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-base-300)] disabled:text-[var(--color-base-800)] transition-colors duration-100 ease-in-out'
  const classNamePublished = 'text-[var(--color-base-800)] bg-[var(--color-success-500)]'
  const classNameUnpublished = 'text-[var(--color-base-800)] bg-[var(--color-error-500)]'
  const className = value === 'published' ? classNamePublished : classNameUnpublished

  return (
    <div
      className={`${baseClass} ${className}`}
      onClick={() => setValue(value === 'published' ? 'unpublished' : 'published')}
    >
      <p className="m-0 p-4 text-center text-lg font-bold leading-none">
        {value === 'published' ? 'Published. Click to change.' : 'Not Published. Click to change.'}
      </p>
    </div>
  )
}

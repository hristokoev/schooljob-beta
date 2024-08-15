'use client'

import { CustomComponent } from 'payload'
import React from 'react'
import { useField } from '@payloadcms/ui'

import './index.scss'

export const StatusSelectField: CustomComponent = ({ path }) => {
  const { value, setValue } = useField<string>(path)

  return (
    <div
      className={`status-select-field ${value}`}
      onClick={() => setValue(value === 'published' ? 'unpublished' : 'published')}
    >
      <p className="status-text">
        {value === 'published' ? 'Published. Click to change.' : 'Not Published. Click to change.'}
      </p>
    </div>
  )
}

'use client'

import { CustomComponent } from 'payload'
import React from 'react'
import { useField } from '@payloadcms/ui'

import './index.scss'

export const StatusSelectField: CustomComponent = ({ path }) => {
  const { value, setValue } = useField<string>(path)

  const toggleStatus = () => {
    switch (value) {
      case 'published':
        setValue('expired')
        break
      case 'expired':
        setValue('unpublished')
        break
      case 'unpublished':
      default:
        setValue('published')
        break
    }
  }

  const getStatusText = () => {
    switch (value) {
      case 'published':
        return 'Published'
      case 'expired':
        return 'Expired'
      case 'unpublished':
      default:
        return 'Not Published'
    }
  }

  return (
    <div className={`status-select-field ${value}`} onClick={toggleStatus}>
      <p className="status-text">{`${getStatusText()}. Click to change.`}</p>
    </div>
  )
}

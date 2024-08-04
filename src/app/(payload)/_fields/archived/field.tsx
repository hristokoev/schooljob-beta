'use client'

import { CustomComponent } from 'payload'
import { useEffect } from 'react'
import { useField } from '@payloadcms/ui'

import './index.scss'

export const ArchivedField: CustomComponent = ({ path }) => {
  const { value } = useField<string>(path)

  useEffect(() => {
    const form = document.querySelector('.document-fields.document-fields--has-sidebar')

    if (value && form) {
      form.classList.add('archived')
    }
  }, [value])

  return null
}

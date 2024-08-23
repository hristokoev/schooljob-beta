'use client'

import React, { useEffect } from 'react'
import { useField } from '@payloadcms/ui'

import './index.scss'

const ArchivedField: React.FC = () => {
  const { value } = useField({ path: 'archived' })

  useEffect(() => {
    const form = document.querySelector('.document-fields.document-fields--has-sidebar')

    if (value && form) {
      form.classList.add('archived')
    }
  }, [value])

  return null
}

export { ArchivedField }

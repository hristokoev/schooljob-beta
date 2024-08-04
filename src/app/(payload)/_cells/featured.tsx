'use client'

import { CheckIcon, useTableCell, XIcon } from '@payloadcms/ui'
import { CustomComponent } from 'payload'
import React from 'react'

const FeaturedCell: CustomComponent = () => {
  const { cellData } = useTableCell()

  return <div>{cellData ? <CheckIcon /> : <XIcon />}</div>
}

export { FeaturedCell }

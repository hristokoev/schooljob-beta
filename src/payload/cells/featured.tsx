'use client'

import { CheckIcon, useTableCell, XIcon } from '@payloadcms/ui'
import React from 'react'

const FeaturedCell: React.FC = () => {
  const { cellData } = useTableCell()

  return <div>{cellData ? <CheckIcon /> : <XIcon />}</div>
}

export { FeaturedCell }

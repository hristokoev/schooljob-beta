'use client'

import { CustomComponent } from 'payload'
import { useTableCell, CheckIcon, XIcon } from '@payloadcms/ui'

const FeaturedCell: CustomComponent = () => {
  const { cellData } = useTableCell()
  return <div>{cellData ? <CheckIcon /> : <XIcon />}</div>
}

export { FeaturedCell }

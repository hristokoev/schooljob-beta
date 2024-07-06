'use client'

import { CustomComponent } from 'payload'
import { useTableCell } from '@payloadcms/ui'

export const StatusSelectCell: CustomComponent = () => {
  const { cellData } = useTableCell()
  return cellData === 'published' ? 'Published' : 'Unpublished'
}

/*
  TODO: Make it so the cell component controls the value
*/
'use client'

import { Button, toast, useTableCell } from '@payloadcms/ui'
import { CustomComponent } from 'payload'
import { updateDocument } from '@/payload/actions'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import './style.scss'
import { Config } from '@payload-types'

const ArchivedCell: CustomComponent = () => {
  const { cellData, rowData, customCellContext } = useTableCell()
  const router = useRouter()
  const handleClick = useCallback(() => {
    try {
      updateDocument({
        collection: customCellContext?.collectionSlug as keyof Config['collections'],
        id: rowData.id,
        data: {
          ...rowData,
          archived: !cellData,
        },
      })
      toast.success(`Document has been ${cellData ? 'restored' : 'archived'}.`)
    } catch (error) {
      toast.error('Error updating document')
    } finally {
      router.refresh()
    }
  }, [cellData, rowData, router, customCellContext])

  return (
    <Button
      buttonStyle="secondary"
      size="small"
      className={cellData ? 'archived' : 'published'}
      onClick={() => handleClick()}
      id={rowData.id}
    >
      {cellData ? 'Restore' : 'Archive'}
    </Button>
  )
}

export { ArchivedCell }

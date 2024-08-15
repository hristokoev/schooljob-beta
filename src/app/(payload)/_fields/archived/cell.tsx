'use client'

import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Button, LoadingOverlayToggle, toast, useTableCell } from '@payloadcms/ui'
import React, { useCallback, useEffect, useState } from 'react'
import { Config } from '@payload-types'
import { CustomComponent } from 'payload'
import { useRouter } from 'next/navigation'

import { updateDocument } from '@/payload/actions'

import './index.scss'

const ArchivedCell: CustomComponent = () => {
  const [loading, setLoading] = useState(false)
  const { cellData, rowData, customCellContext } = useTableCell()
  const router = useRouter()
  const handleClick = useCallback(() => {
    setLoading(true)
    const result = updateDocument({
      collection: customCellContext?.collectionSlug as keyof Config['collections'],
      id: rowData.id,
      data: {
        ...rowData,
        archived: !cellData,
      },
    })
    result
      .then(() => {
        toast.success('Document updated')
      })
      .catch(() => {
        toast.error('Error while updating document')
      })
      .finally(() => {
        setLoading(false)
        router.refresh()
      })
  }, [cellData, rowData, router, customCellContext])

  useEffect(() => {
    const cellArchived = document.querySelectorAll('.cell-archived')

    if (cellArchived) {
      cellArchived.forEach(cell => {
        const cellParent = cell.parentElement

        if (cellParent) {
          const childNode = cellParent.childNodes[1].childNodes[0] as HTMLElement
          const childNodeText = childNode.innerText
          const childNodeHref = childNode.getAttribute('href') || childNode.dataset.href || '#'

          // Create a new child node
          const newChildNode = document.createElement('span')
          newChildNode.innerText = childNodeText
          newChildNode.dataset.href = childNodeHref

          if (cellData) {
            // Replace the child node with a span if cellData is true
            cellParent.childNodes[1].replaceChild(newChildNode, childNode)
          } else {
            // Replace the span with the original <a> element if cellData is false
            const originalChildNode = document.createElement('a')
            originalChildNode.innerText = childNodeText
            originalChildNode.setAttribute('href', childNodeHref)
            // Copy attributes from the span to the new <a> element
            Array.from(childNode.attributes).forEach(attr => {
              originalChildNode.setAttribute(attr.name, attr.value)
            })
            cellParent.childNodes[1].replaceChild(originalChildNode, childNode)
          }
        }
      })
    }
  }, [cellData])

  return (
    <Button
      buttonStyle="transparent"
      size="small"
      className={cellData ? 'archived' : 'published'}
      onClick={() => handleClick()}
      id={rowData.id}
      disabled={loading}
    >
      <LoadingOverlayToggle name="loading" show={loading} />
      {cellData ? (
        <ArrowPathIcon style={{ width: '24px', height: '24px' }} />
      ) : (
        <TrashIcon style={{ width: '24px', height: '24px' }} />
      )}
    </Button>
  )
}

export { ArchivedCell }

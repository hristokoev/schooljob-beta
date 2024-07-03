'use client'

import { CustomComponent } from 'payload'
import { useField, useTableCell } from '@payloadcms/ui'
import { TrashIcon } from '@heroicons/react/24/solid'

import './style.scss'

const ArchivedCell: CustomComponent = () => {
  const { value, setValue, path } = useField({
    path: 'archived',
  })
  const { cellData, customCellContext } = useTableCell()
  return (
    <div style={{ width: '32px', height: '32px' }}>
      {JSON.stringify(customCellContext)}
      <TrashIcon
        style={{
          color: cellData ? 'var(--theme-error-500)' : 'var(--color-base-500)',
        }}
        onClick={() => {
          setValue(!value)
        }}
      />
    </div>
  )
}

export { ArchivedCell }

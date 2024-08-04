'use client'

import React, { useState } from 'react'
import { Button } from '@payloadcms/ui'
import { CustomComponent } from 'payload'
import { useRouter } from 'next/navigation'
import { useSearchParams } from '@payloadcms/ui'

import './style.scss'

type ArchiveFilter = 'all' | 'active' | 'archived' | undefined

const Archived: CustomComponent = () => {
  const { searchParams, stringifyParams } = useSearchParams()
  const [selected, setSelected] = useState<ArchiveFilter>(undefined)
  const router = useRouter()

  const updateSearchParams = (filter: ArchiveFilter) => {
    if (filter !== 'all') {
      searchParams.where = {
        or: [
          {
            and: [
              {
                archived: {
                  equals: filter === 'archived' ? true : false,
                },
              },
            ],
          },
        ],
      }
    } else {
      delete searchParams.where
    }

    const newUrl = stringifyParams({
      params: searchParams,
      replace: true,
    })

    setSelected(filter)
    router.push(newUrl)
  }

  return (
    <div className="archived-container">
      <Button
        buttonStyle={selected === 'all' ? 'primary' : 'secondary'}
        size="small"
        onClick={() => updateSearchParams('all')}
      >
        All
      </Button>
      <Button
        buttonStyle={selected === 'active' ? 'primary' : 'secondary'}
        size="small"
        onClick={() => updateSearchParams('active')}
      >
        Active
      </Button>
      <Button
        buttonStyle={selected === 'archived' ? 'primary' : 'secondary'}
        size="small"
        onClick={() => updateSearchParams('archived')}
      >
        Archived
      </Button>
    </div>
  )
}

export { Archived }

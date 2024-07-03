'use client'

import React, { useState } from 'react'
import { Button } from '@payloadcms/ui'
import { CustomComponent } from 'payload'
import { useSearchParams } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'

import './style.scss'

const Archived: CustomComponent = () => {
  const { searchParams, stringifyParams } = useSearchParams()
  const [selected, setSelected] = useState<'false' | 'true' | undefined>()
  const router = useRouter()
  const updateSearchParams = (whereValue: 'false' | 'true' | undefined) => {
    const newSearchParams = {
      ...searchParams,
      where: {
        or: [
          {
            and: [
              {
                archived: {
                  equals: whereValue,
                },
              },
            ],
          },
        ],
      },
    }

    if (whereValue === undefined) {
      delete newSearchParams.where
    }

    const newUrl = stringifyParams({
      params: newSearchParams,
      replace: true,
    })

    setSelected(whereValue)

    router.push(newUrl)
  }

  return (
    <div className="archived-container">
      <Button
        buttonStyle={selected === undefined ? 'primary' : 'secondary'}
        size="small"
        onClick={() => updateSearchParams(undefined)}
      >
        All
      </Button>
      <Button
        buttonStyle={selected === 'false' ? 'primary' : 'secondary'}
        size="small"
        onClick={() => updateSearchParams('false')}
      >
        Active
      </Button>
      <Button
        buttonStyle={selected === 'true' ? 'primary' : 'secondary'}
        size="small"
        onClick={() => updateSearchParams('true')}
      >
        Archived
      </Button>
    </div>
  )
}

export { Archived }

'use client'

import React, { useState } from 'react'
import { useSearchParams, useTranslation } from '@payloadcms/ui'
import { Button } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'

import { TranslationKeys } from '@/payload/translations'

import './style.scss'

type ArchiveFilter = 'all' | 'active' | 'archived' | undefined

// TODO: Use from payload after updating the beta version
type NestedKeysStripped<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends object
          ? `${K}:${NestedKeysStripped<T[K]>}`
          : K
        : never
    }[keyof T]
  : ''

type CustomTranslationKeys = NestedKeysStripped<TranslationKeys>

const Archived: React.FC = () => {
  const { t } = useTranslation<TranslationKeys, CustomTranslationKeys>()
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
                  equals: filter === 'archived' ? 'true' : 'false',
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
        {t('fields:showAll')}
      </Button>
      <Button
        buttonStyle={selected === 'active' ? 'primary' : 'secondary'}
        size="small"
        onClick={() => updateSearchParams('active')}
      >
        {t('other:active')}
      </Button>
      <Button
        buttonStyle={selected === 'archived' ? 'primary' : 'secondary'}
        size="small"
        onClick={() => updateSearchParams('archived')}
      >
        {t('other:archived')}
      </Button>
    </div>
  )
}

export { Archived }

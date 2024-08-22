'use client'

import { useTableCell, useTranslation } from '@payloadcms/ui'
import { CustomComponent } from 'payload'

import { TranslationKeys } from '@/payload/translations'

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

export const StatusSelectCell: CustomComponent = () => {
  const { t } = useTranslation<TranslationKeys, CustomTranslationKeys>()
  const { cellData } = useTableCell()

  return t(`other:${cellData}` as 'other:published')
}

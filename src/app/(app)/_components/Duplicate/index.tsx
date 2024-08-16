'use client'

import { DocumentDuplicateIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components'

interface DuplicateProps {
  id: string
}

const Duplicate: React.FC<DuplicateProps> = ({ id }) => {
  const t = useTranslations()

  return (
    <Link href={`/account/jobs/create?id=${id}`} passHref>
      <Button size="sm" className="w-full">
        <DocumentDuplicateIcon className="-ml-1 mr-2 h-5 w-5" />
        {t('editJob.duplicate')}
      </Button>
    </Link>
  )
}

export { Duplicate }

import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Metadata } from 'next'
import { PencilIcon } from '@heroicons/react/24/solid'
import React from 'react'

import { Button, Gutter, MinHeight, VerticalPadding } from '@/components'
import { Avatar } from './Avatar'
import { Cover } from './Cover'
import { Grid } from './Grid'
import { Header } from './Header'

export default async function Account() {
  const t = await getTranslations()

  return (
    <MinHeight className="bg-slate-100">
      <Cover />
      <VerticalPadding top="none" bottom="sm" className="bg-white">
        <Gutter>
          <div className="relative">
            <div className="-mt-16 mb-6 flex justify-center sm:mb-3 md:justify-start">
              <div className="flex w-full flex-col items-center sm:flex-row sm:items-end sm:justify-between">
                <Avatar />
                <Link href="/account/settings/profile">
                  <Button type="button" size="sm" variant="outline">
                    <PencilIcon className="h-4 w-4 shrink-0 fill-current text-slate-400" />
                    <span className="ml-2">{t('ui.editProfile')}</span>
                  </Button>
                </Link>
              </div>
            </div>
            <Header />
          </div>
        </Gutter>
      </VerticalPadding>
      <VerticalPadding bottom="lg" className="bg-slate-100">
        <Gutter>
          <Grid />
        </Gutter>
      </VerticalPadding>
    </MinHeight>
  )
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.account' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

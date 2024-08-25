import React, { Fragment } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

import { Gutter, MinHeight, VerticalPadding } from '@/components'
import { PricingTable } from '@/blocks'

export const dynamic = 'force-static'

export default async function Pricing() {
  const t = await getTranslations()
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const memberships = await payload.find({
    collection: 'memberships',
    depth: 1,
    sort: 'price',
  })

  return (
    <Fragment>
      <MinHeight>
        <VerticalPadding top="lg">
          <Gutter>
            <div className="text-center">
              <h1 className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl">
                {t('membership.h1')}
              </h1>
              <div className="mx-auto max-w-3xl">
                <p className="text-lg text-gray-700">{t('membership.description')}</p>
              </div>
            </div>
          </Gutter>
        </VerticalPadding>
        <VerticalPadding bottom="lg">
          <Gutter className="max-w-6xl">
            <PricingTable memberships={memberships.docs} />
          </Gutter>
        </VerticalPadding>
      </MinHeight>
    </Fragment>
  )
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.pricing' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

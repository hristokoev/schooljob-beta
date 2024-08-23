import React, { Fragment } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

import { Gutter, VerticalPadding } from '@/components'
import { getMeUser } from '@/utilities/getMeUser'
import { PricingTable } from '@/blocks'

export default async function BuyMoreJobs() {
  const t = await getTranslations()
  const { user } = await getMeUser()
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const memberships = await payload.find({
    collection: 'memberships',
    depth: 1,
    sort: 'price',
  })

  const organization = await payload.findByID({
    collection: 'organizations',
    id:
      typeof user?.profile?.value === 'string' ? user.profile.value : user?.profile?.value.id || '',
    depth: 1,
  })

  const overwrittenMemberships = () => {
    if (!organization) {
      return memberships.docs
    }

    return memberships.docs.map(membership => {
      const organizationMembership = organization?.memberships?.find(
        organizationMembership =>
          (typeof organizationMembership.membership === 'string'
            ? organizationMembership.membership
            : organizationMembership.membership.id) === membership.id,
      )

      if (organizationMembership) {
        return {
          ...membership,
          price: organizationMembership.price,
        }
      }

      return membership
    })
  }

  return (
    <Fragment>
      <VerticalPadding top="sm">
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
      <VerticalPadding>
        <Gutter className="max-w-6xl">
          <PricingTable memberships={overwrittenMemberships()} />
        </Gutter>
      </VerticalPadding>
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

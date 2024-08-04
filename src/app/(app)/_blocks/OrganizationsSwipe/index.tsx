import configPromise from '@payload-config'
import { getCachedPayload } from '@cached-local-api'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'
import React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  OrganizationCard,
} from '@/components'
import { EmptyBlock } from '../EmptyBlock'
import { OrganizationSearchParams } from '@/types'

const OrganizationsSwipe: React.FC<OrganizationSearchParams> = async props => {
  const t = await getTranslations()
  const { limit = 6, page = 1, sort, featured } = props

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const cachedPayload = getCachedPayload(payload)

  const result = await cachedPayload.find({
    collection: 'organizations',
    limit,
    page,
    sort,
    where: {
      ...(featured && { featured: { equals: featured } }),
    },
  })

  if (!result) {
    return null
  }

  const organizations = result.docs

  if (organizations.length === 0) {
    return <EmptyBlock text={t('errors.noOrganizations')} />
  }

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-2">
        {organizations.map(organization => (
          <CarouselItem key={organization.id} className="pl-2 md:basis-1/2 lg:basis-1/3">
            <OrganizationCard {...organization} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant="default" />
      <CarouselNext variant="default" />
    </Carousel>
  )
}

export { OrganizationsSwipe }
export { OrganizationsSwipeSkeleton } from './Skeleton'

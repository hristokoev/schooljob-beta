import React from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { useTranslations } from 'next-intl'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  OrganizationCard,
} from '@/components'
import { OrganizationSearchParams } from '@/types'
import { EmptyBlock } from '../EmptyBlock'
import { getCachedPayload } from '@cached-local-api'

const OrganizationsSwipe: React.FC<OrganizationSearchParams> = async props => {
  const t = useTranslations()
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
    return <EmptyBlock text={t('noOrganizationsFound')} />
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

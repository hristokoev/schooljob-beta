import React, { Fragment } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  FeaturedJobCard,
} from '@/components'
import { EmptyBlock } from '../EmptyBlock'
import { getCachedPayload } from '@cached-local-api'

interface JobsSwipeProps {
  limit?: number
  sort?: string
  featured?: boolean
}

const JobsSwipe: React.FC<JobsSwipeProps> = async ({ limit, sort, featured }) => {
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const cachedPayload = getCachedPayload(payload)

  const result = await cachedPayload.find({
    collection: 'jobs',
    depth: 2,
    limit,
    sort,
    where: {
      status: {
        equals: 'published',
      },
      featured: {
        equals: featured,
      },
    },
  })

  const jobs = result.docs

  if (jobs.length === 0) {
    return <EmptyBlock text="No Jobs Found" />
  }

  return (
    <Fragment>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2">
          {jobs.map(job => (
            <CarouselItem key={job.id} className="pl-2 md:basis-1/2 lg:basis-1/3">
              <FeaturedJobCard {...job} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="default" />
        <CarouselNext variant="default" />
      </Carousel>
    </Fragment>
  )
}

export { JobsSwipe }
export { JobsSwipeSkeleton } from './Skeleton'

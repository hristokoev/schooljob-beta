import React, { Fragment } from 'react'

import { Carousel, CarouselContent, CarouselItem } from '@/components'

const OrganizationsSwipeSkeleton: React.FC = () => {
  return (
    <Fragment>
      <div className="mb-4 flex animate-pulse justify-between">
        <div className="h-5 w-56 bg-slate-200" />
        <div className="h-5 w-36 bg-slate-200" />
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index} className="animate-pulse pl-2 md:basis-1/2 lg:basis-1/3">
              <div className="overflow-hidden rounded-md bg-white">
                <div className="flex flex-col">
                  <div className="h-32 bg-slate-300" />
                  <div className="flex flex-col gap-2 justify-self-end p-5">
                    <div className="-mt-12 mb-2 h-16 w-16 rounded-md bg-slate-400" />
                    <div className="h-6 bg-slate-200" />
                    <div className="h-6 bg-slate-200" />
                    <div className="h-12 bg-slate-200" />
                    <div className="flex gap-2">
                      <div className="h-5 w-32 rounded-full bg-slate-200"></div>
                      <div className="h-5 w-24 rounded-full bg-slate-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Fragment>
  )
}

export { OrganizationsSwipeSkeleton }

import Link from 'next/link'
import { type Organization } from '@payload-types'
import React from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { useTranslations } from 'next-intl'

import { Media, Pill } from '@/components'
import { cz } from '@/payload/data'

export const OrganizationCard: React.FC<Organization> = ({
  slug,
  title,
  description,
  location,
  logo,
  imageCover,
  jobsPublished,
  featured,
}: Organization) => {
  const t = useTranslations()

  return (
    <div
      className={`h-full bg-white hover:bg-slate-50 sm:col-span-6 xl:col-span-4 ${
        featured
          ? 'border-royal-blue-200 hover:border-blue-300'
          : 'border-slate-200 hover:border-slate-300'
      } group overflow-hidden rounded-md border transition duration-100 ease-in-out`}
    >
      <Link className="flex flex-col" href={`/organizations/${slug}`}>
        <div className="h-32 overflow-hidden bg-royal-blue-200">
          {imageCover && (
            <Media
              resource={imageCover}
              alt={title}
              className="h-32 w-auto"
              imgClassName="h-full object-cover select-none group-hover:scale-105 transition-transform duration-150 ease-in-out"
            />
          )}
        </div>
        <div className="z-10 flex flex-col gap-2 justify-self-end p-5">
          <div className="-mt-12 flex items-center">
            <div className="mb-2 flex h-16 w-16 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-royal-blue-500 shadow-md">
              {logo ? (
                <Media
                  resource={logo}
                  alt={title}
                  className="h-16 w-16"
                  imgClassName="h-full object-cover"
                />
              ) : (
                <div className="text-4xl font-bold text-slate-100">{title && title.charAt(0)}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-2">
            <div className="inline-flex text-slate-800 hover:text-slate-900">
              {featured && <StarIcon className="mr-1 h-5 w-5 text-royal-blue-500" />}
              <h5 className="line-clamp-1 font-semibold leading-snug">{title}</h5>
            </div>
            <div className="line-clamp-2 h-12">
              <p>{description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {jobsPublished && jobsPublished.length > 0 && (
                <Pill color="green">{t('ui.jobs', { count: jobsPublished.length })}</Pill>
              )}
              {location &&
                location.map(location => (
                  <Pill key={location} color="blue">
                    {cz.find(l => l.value === location)?.label}
                  </Pill>
                ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

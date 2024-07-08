import Link from 'next/link'
import React from 'react'

import { type Job, type Organization } from '@payload-types'
import { convertValue, renderSalary } from '@/utilities'
import { Media, Pill } from '@/components'
import { StarIcon } from '@heroicons/react/24/solid'

export const FeaturedJobCard: React.FC<Job> = ({
  publicId,
  slug,
  title,
  salary,
  employmentType,
  featured,
  organization,
}: Job) => {
  const { title: organizationTitle, logo, imageCover } = organization as Organization
  const salaryText = renderSalary(salary)

  const transformedEmploymentType = employmentType.map(convertValue)

  return (
    <div className="group col-span-full h-full overflow-hidden rounded-md border border-slate-300 bg-white transition duration-100 ease-in-out hover:border-slate-300 hover:bg-slate-50 sm:col-span-6 xl:col-span-4">
      <Link className="flex flex-col" href={`/jobs/${publicId}/${slug}`}>
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
            <div className="mb-2 flex h-16 w-16 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-royal-blue-500 shadow-sm">
              {logo ? (
                <Media
                  resource={logo}
                  alt={organizationTitle}
                  className="h-16 w-16"
                  imgClassName="h-full object-cover"
                />
              ) : (
                <div className="text-4xl font-bold text-slate-100">
                  {organizationTitle.charAt(0)}
                </div>
              )}
            </div>
            <div className="ml-2 mt-6 inline-flex text-slate-800 hover:text-slate-900">
              <h5 className="line-clamp-1 font-semibold leading-snug">{organizationTitle}</h5>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-2">
            <div className="inline-flex text-slate-800 hover:text-slate-900">
              {featured && <StarIcon className="mr-1 h-5 w-5 text-royal-blue-500" />}
              <h5 className="line-clamp-1 h-6 font-semibold leading-snug">{title}</h5>
            </div>
            <div className="flex gap-2">
              {transformedEmploymentType.map((type) => (
                <Pill key={type}>{type}</Pill>
              ))}
            </div>
            {salary && salary.enabled ? (
              <Pill color="yellow">{salaryText}</Pill>
            ) : (
              <div>&nbsp;</div>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

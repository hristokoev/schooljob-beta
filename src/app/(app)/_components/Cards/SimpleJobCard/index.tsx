import { type Job, type Organization } from '@payload-types'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import React from 'react'

import { Favorite, Pill } from '@/components'
import { formatDate, isWithinLast3Days, renderSalary } from '@/utilities'

export const SimpleJobCard: React.FC<Job> = async ({
  publicId,
  slug,
  title,
  salary,
  employmentType,
  createdAt,
  featured,
  ...props
}: Job) => {
  const t = await getTranslations()
  const formattedDate = formatDate(createdAt)
  const isNew = isWithinLast3Days(createdAt)
  const salaryText = renderSalary(salary)
  const transformedEmploymentType = employmentType.map(value => t(`search.options.${value}`))
  const organization = props.organization as Organization

  return (
    <div className="rounded-md border border-slate-300 bg-white transition duration-100 ease-in-out hover:border-slate-300 hover:bg-slate-50">
      <Link className="flex h-full gap-5 p-5" href={`/jobs/${publicId}/${slug}`}>
        <div className="flex size-16 flex-none items-center justify-center rounded bg-royal-blue-500 text-4xl font-bold text-white md:size-20">
          {title[0].toUpperCase()}
        </div>
        <div className="flex grow flex-col justify-between overflow-x-hidden">
          <div className="inline-flex items-baseline text-slate-800 hover:text-slate-900">
            <div>
              {featured || isNew ? (
                <span className="mr-2 inline-block md:hidden">
                  {featured ? (
                    <Pill color="orange">{t('ui.labelHot')}</Pill>
                  ) : isNew ? (
                    <Pill color="green">{t('ui.labelNew')}</Pill>
                  ) : null}
                </span>
              ) : null}
              <h5 className="inline font-semibold leading-snug">{title}</h5>
            </div>
          </div>
          <ul className="no-scrollbar -tracking-1 flex list-none flex-row text-sm font-medium text-neutral-400 transition-colors max-md:overflow-x-auto max-md:pr-6 md:hidden md:group-hover:text-black [&>li:last-child]:border-none [&>li]:flex-none [&>li]:border-r [&>li]:border-neutral-400">
            <li className="ml-4 pr-4 first:ml-0">{organization.title}</li>
            {transformedEmploymentType.map((type, index) => (
              <li className="ml-4 pr-4" key={index}>
                {type}
              </li>
            ))}
            <li className="ml-4">{salaryText}</li>
          </ul>
          <div className="hidden gap-2 text-sm text-slate-700 md:flex">{organization.title}</div>
          <div className="hidden gap-2 md:flex">
            {transformedEmploymentType.map((type, index) => (
              <Pill key={index}>{type}</Pill>
            ))}
            {salary && salary.enabled && <Pill color="yellow">{salaryText}</Pill>}
          </div>
        </div>
        <div
          className={`flex flex-col ${featured || isNew ? 'justify-between' : 'justify-center'}`}
        >
          <div className="mb-2 ml-auto flex items-center gap-2 text-sm font-medium text-slate-500">
            <span className="hidden text-right md:block">{formattedDate}</span>
            <Favorite />
          </div>
          <div className="ml-auto hidden md:block">
            {featured ? (
              <Pill color="orange">{t('ui.labelRecommended')}</Pill>
            ) : isNew ? (
              <Pill color="green">{t('ui.labelNew')}</Pill>
            ) : null}
          </div>
        </div>
      </Link>
    </div>
  )
}

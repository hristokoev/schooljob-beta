import React, { Fragment } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { Gutter, Main } from '@/components'
import { BreadcrumbBlock } from '@/blocks'
import { JobsEditView } from '../edit-view'
import { getMeUser } from '@/utilities/getMeUser'
import { transformToFrontend } from '@/utilities/transformFields'
import { JobFormData } from 'src/app/(app)/_types'
import { type Option } from '@/types'

interface Props {
  params: { id: string }
}

export default async function EditJob({ params: { id } }: Props) {
  const { user } = await getMeUser()
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const data = await payload.findByID({
    collection: 'jobs',
    id,
    overrideAccess: false,
    user,
    depth: 2,
  })

  const frontEndData: JobFormData = {
    status: data.status as JobFormData['status'],
    title: data.title,
    employmentType: transformToFrontend(data.employmentType || []) as Option[],
    categories: transformToFrontend(data.categories || []) as Option[],
    location: data.location || '',
    locationType: transformToFrontend(data.locationType || []) as Option[],
    education: transformToFrontend(data.education || []) as Option[],
    experience: transformToFrontend(data.experience || []) as Option[],
    language: transformToFrontend(data.language || []) as Option[],
    salary: {
      enabled: data.salary?.enabled || false,
      range: data.salary?.range || false,
      base: data.salary?.base || 0,
      minSalary: data.salary?.minSalary || 0,
      maxSalary: data.salary?.maxSalary || 0,
      currency: transformToFrontend(data.salary?.currency || '') as Option,
      salaryType: transformToFrontend(data.salary?.salaryType || '') as Option,
    },
    description: data.description || '',
    richText: data.richText || {
      root: { type: '', children: [], direction: null, format: '', indent: 0, version: 0 },
    },
    skills: Array.isArray(data.skills) ? (data.skills as string[]) : [],
    certifications: Array.isArray(data.certifications) ? (data.certifications as string[]) : [],
    responsibilities: Array.isArray(data.responsibilities)
      ? (data.responsibilities as string[])
      : [],
    benefits: Array.isArray(data.benefits) ? (data.benefits as string[]) : [],
    suitableFor: {
      students: data.suitableFor?.students || false,
      disabledPeople: data.suitableFor?.disabledPeople || false,
      mothersOnMaternityLeave: data.suitableFor?.mothersOnMaternityLeave || false,
      retirees: data.suitableFor?.retirees || false,
    },
    customApplyUrl: data.customApplyUrl || '',
  }

  const links = [
    { href: '/', text: 'Home' },
    { href: '/account', text: 'Account' },
    { href: '/account/jobs', text: 'Jobs' },
  ]

  return (
    <Fragment>
      <Gutter>
        <BreadcrumbBlock links={links} current="Edit Job" />
      </Gutter>
      <Main>
        <JobsEditView {...frontEndData} id={id} />
      </Main>
    </Fragment>
  )
}

export const metadata = {
  title: 'Account Settings - Mosaic',
  description: 'Page description',
}

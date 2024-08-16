import React, { Fragment } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

import { Gutter, Main } from '@/components'
import { BreadcrumbBlock } from '@/blocks'
import { cz } from '@/payload/data'
import { getMeUser } from '@/utilities/getMeUser'
import { JobFormData } from '@/types'
import { JobsEditView } from '../edit-view'

interface Props {
  params: { id: string; locale: string }
}

export default async function EditJob({ params: { id } }: Props) {
  const t = await getTranslations()
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
    employmentType: data.employmentType.map(type => {
      return {
        label: t(`search.options.${type}`),
        value: type,
      }
    }),
    categories: data.categories.map(category => {
      return {
        label: t(`search.options.${category}`),
        value: category,
      }
    }),
    location: data.location?.map(type => {
      return {
        label: cz.find(type => type === type)?.label || type,
        value: type,
      }
    }),
    locationType: data.locationType?.map(type => {
      return {
        label: t(`search.options.${type}`),
        value: type,
      }
    }),
    education: data.education?.map(type => {
      return {
        label: t(`search.options.${type}`),
        value: type,
      }
    }),
    experience: data.experience?.map(type => {
      return {
        label: t(`search.options.${type}`),
        value: type,
      }
    }),
    language: data.language?.map(type => {
      return {
        label: t(`search.options.${type}`),
        value: type,
      }
    }),
    salary: {
      enabled: data.salary?.enabled || false,
      range: data.salary?.range || false,
      base: data.salary?.base || 0,
      minSalary: data.salary?.minSalary || 0,
      maxSalary: data.salary?.maxSalary || 0,
      currency: {
        label: t(`search.options.${data.salary?.currency || 'czk'}`),
        value: data.salary?.currency || 'czk',
      },
      salaryType: {
        label: t(`search.options.${data.salary?.salaryType || 'monthly'}`),
        value: data.salary?.salaryType || 'monthly',
      },
    },
    richText: data.richText || {
      root: { type: '', children: [], direction: null, format: '', indent: 0, version: 0 },
    },
    skills: Array.isArray(data.skills) ? (data.skills as string[]) : [],
    certifications: Array.isArray(data.certifications) ? (data.certifications as string[]) : [],
    benefits: Array.isArray(data.benefits) ? (data.benefits as string[]) : [],
    suitableFor: {
      students: data.suitableFor?.students || false,
      disabledPeople: data.suitableFor?.disabledPeople || false,
      mothersOnMaternityLeave: data.suitableFor?.mothersOnMaternityLeave || false,
      retirees: data.suitableFor?.retirees || false,
    },
  }

  const links = [
    { href: '/', text: t('home') },
    { href: '/account', text: t('account') },
    { href: '/account/jobs', text: t('jobs') },
  ]

  return (
    <Fragment>
      <Gutter>
        <BreadcrumbBlock links={links} current={t('ui.editJob')} />
      </Gutter>
      <Main>
        <JobsEditView {...frontEndData} id={id} />
      </Main>
    </Fragment>
  )
}

export async function generateMetadata({ params: { locale, id } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale })
  const { user } = await getMeUser()
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const data = await payload.findByID({
    collection: 'jobs',
    id,
    overrideAccess: false,
    user,
    depth: 0,
  })

  if (!data) {
    return {
      title: t('notFound'),
    }
  }

  return {
    title: t('seo.editJob.title', { title: data.title }),
    description: t('seo.editJob.description'),
  }
}

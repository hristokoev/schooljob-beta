// TODO: Fix typing and remove 'any'

'use server'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'

import { getMeUser } from '@/utilities/getMeUser'
import { JobFormData } from '@/types'

export const createOrUpdateJob = async (data: JobFormData, id?: string) => {
  const t = await getTranslations()
  const { user } = await getMeUser()

  const jobData = {
    ...data,
    categories: data.categories.map(category => category.value),
    employmentType: data.employmentType.map(type => type.value),
    locationType: data?.locationType?.map(type => type.value) || [],
    education: data?.education?.map(education => education.value) || [],
    experience: data?.experience?.map(experience => experience.value) || [],
    language: data?.language?.map(language => language.value) || [],
    salary: {
      ...data.salary,
      currency: data?.salary?.currency?.value || [],
      salaryType: data?.salary?.salaryType?.value || [],
    },
  }

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  if (id) {
    try {
      const doc = await payload.update({
        collection: 'jobs',
        id,
        data: jobData as any,
        user
      })

      if (!doc) {
        throw new Error(t('errors.updateJob'))
      }

      return doc
    } catch (error) {
      throw new Error(t('errors.updateJob'))
    }
  }

  try {
    const doc = await payload.create({
      collection: 'jobs',
      data: {
        ...jobData as any,
        applications: []
      },
      user
    })

    if (!doc) {
      throw new Error(t('errors.createJob'))
    }

    return doc
  } catch (error) {
    throw new Error(t('errors.createJob'))
  }

}

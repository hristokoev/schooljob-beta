'use server'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { transformToPayload } from '@/utilities'
import { getMeUser } from '@/utilities/getMeUser'

export const createOrUpdateJob = async (data: any, id?: string) => {
  const { user } = await getMeUser()

  const jobData = {
    ...data,
    categories: transformToPayload(data.categories),
    employmentType: transformToPayload(data.employmentType),
    locationType: transformToPayload(data.locationType),
    education: transformToPayload(data.education),
    experience: transformToPayload(data.experience),
    language: transformToPayload(data.language),
    salary: {
      ...data.salary,
      currency: data.salary.currency?.value,
      salaryType: data.salary.salaryType?.value,
    },
  }

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  if (id) {
    const doc = await payload.update({
      collection: 'jobs',
      id,
      data: jobData,
      user
    })

    if (!doc) {
      throw new Error('Error updating job')
    }

    return doc
  }

  const doc = await payload.create({
    collection: 'jobs',
    data: jobData,
    user
  })

  if (!doc) {
    throw new Error('Error creating job')
  }

  return doc

}

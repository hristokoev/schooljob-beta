import { CollectionBeforeValidateHook } from 'payload'

import { checkRole } from '@/payload/access'

export const preventMultipleApplications: CollectionBeforeValidateHook = async ({
  data = {},
  operation,
  req: { user, payload },
}) => {
  if (!user) {
    // Allow anonymous users to apply once per job
    if (operation === 'create') {
      const jobId = typeof data.job === 'object' ? data.job.id : data.job
      const candidateEmail = data.email

      const existingApplication = await payload.find({
        collection: 'applications',
        where: {
          and: [{ job: { equals: jobId } }, { email: { equals: candidateEmail } }],
        },
        depth: 0,
      })

      if (existingApplication.docs.length > 0) {
        throw new Error(
          'You have already applied for this job',
        )
      }
    }
  } else {
    // Allow super-admin to bypass application check
    if (checkRole('super-admin', user)) {
      return data
    }

    if (user.profile) {
      // Check if the candidate has already applied for the job
      if (operation === 'create') {
        const jobId = typeof data.job === 'object' ? data.job.id : data.job
        const candidateId =
          typeof user.profile.value === 'object' ? user.profile.value.id : user.profile.value

        const existingApplication = await payload.find({
          collection: 'applications',
          where: {
            and: [{ job: { equals: jobId } }, { candidate: { equals: candidateId } }],
          },
          depth: 0,
        })

        if (existingApplication.docs.length > 0) {
          throw new Error(
            'You have already applied for this job',
          )
        }
      }
    }
  }

  return data
}

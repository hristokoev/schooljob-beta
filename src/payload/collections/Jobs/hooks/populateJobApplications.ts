import type { CollectionAfterChangeHook } from 'payload'

export const populateJobApplications: CollectionAfterChangeHook = async ({
  doc,
  req: { payload },
  operation,
}) => {
  const { id, job } = doc

  if (operation === 'create') {
    try {
      const jobDoc = await payload.findByID({
        collection: 'jobs',
        id: job.id === undefined ? job : job.id,
        depth: 0,
      })

      if (!jobDoc) {
        throw new Error('Job not found')
      }

      const applicationIds = jobDoc.applications ? jobDoc.applications : []

      await payload.update({
        collection: 'jobs',
        id: job.id === undefined ? job : job.id,
        data: {
          applications: jobDoc.applications ? [...applicationIds, id] : [id],
        },
      })
    } catch (error) {
      console.error("Error updating job's applications:", error)
    }
  }

  return doc
}

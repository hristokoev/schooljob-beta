import type { CollectionAfterChangeHook } from 'payload'

export const populateCv: CollectionAfterChangeHook = async ({
  doc,
  req: { payload },
  operation,
}) => {
  const { cv, job } = doc

  try {
    const jobDoc = await payload.findByID({
      collection: 'jobs',
      id: job.id === undefined ? job : job.id,
      depth: 0,
    })

    if (!jobDoc) {
      throw new Error('Job not found')
    }

    const organizationId =
      typeof jobDoc.organization === 'object' ? jobDoc.organization.id : jobDoc.organization
    const jobId = jobDoc.id

    if (operation === 'create') {
      try {
        await payload.update({
          collection: 'cvs',
          id: cv.id === undefined ? cv : cv.id,
          data: {
            job: jobId,
            organization: organizationId,
          },
        })
      } catch (error) {
        console.error("Error updating CV's organization relationship:", error)
      }
    }
  } catch (error) {
    console.error("Error updating CV's organization relationship:", error)
  }

  return doc
}

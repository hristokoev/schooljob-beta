import type { CollectionAfterChangeHook } from 'payload'

export const updateOrganizationJobs: CollectionAfterChangeHook = async ({
  doc,
  req: { payload },
  operation,
  previousDoc,
}) => {
  const { id, organization, status } = doc

  // If the status hasn't changed, we don't need to update organizations
  if (status === previousDoc.status) {
    return
  }

  if (operation === 'update') {
    try {
      const organizationDoc = (await payload.findByID({
        collection: 'organizations',
        id: organization.id === undefined ? organization : organization.id,
        depth: 0,
      })) as { jobsPublished: string[]; jobsUnpublished: string[] }

      if (!organizationDoc) {
        throw new Error('Organization not found')
      }

      const jobsPublishedIds = organizationDoc.jobsPublished ? organizationDoc.jobsPublished : []
      const jobsUnpublishedIds = organizationDoc.jobsUnpublished
        ? organizationDoc.jobsUnpublished
        : []

      if (status === 'published') {
        await payload.update({
          collection: 'organizations',
          id: organization.id === undefined ? organization : organization.id,
          data: {
            jobsPublished: jobsPublishedIds.length > 0 ? [...jobsPublishedIds, id] : [id],
            jobsUnpublished: jobsUnpublishedIds.filter((jobId) => jobId !== id),
          },
        })
      } else if (status === 'unpublished') {
        await payload.update({
          collection: 'organizations',
          id: organization.id === undefined ? organization : organization.id,
          data: {
            jobsPublished: jobsPublishedIds.filter((jobId) => jobId !== id),
            jobsUnpublished: jobsUnpublishedIds.length > 0 ? [...jobsUnpublishedIds, id] : [id],
          },
        })
      }
    } catch (error) {
      console.error("Error updating organization's jobs:", error)
    }
  }
}

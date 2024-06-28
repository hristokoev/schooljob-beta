import { CollectionAfterDeleteHook } from 'payload'

const deletedJobIds = new Set<string | number>()

export const cleanupOrganizationsAfterJobDelete: CollectionAfterDeleteHook = async ({
  req: { payload },
  id,
  doc,
}) => {
  const { organization } = doc

  // Add the deleted job ID to the set
  deletedJobIds.add(id)

  // Debounce-like mechanism to process batch deletions
  if (deletedJobIds.size === 1) {
    // Wait for the next tick to batch collect deletions
    setTimeout(async () => {
      try {
        // Get the organization document to update the jobs array
        const organizationDoc = (await payload.findByID({
          collection: 'organizations',
          id: organization.id === undefined ? organization : organization.id,
          depth: 0,
        })) as { jobsPublished: string[]; jobsUnpublished: string[] }

        // If the organization document is not found, throw an error
        if (!organization) {
          throw new Error('Organization not found')
        }

        // Get the jobs array from the organization document
        const jobsPublishedIds = organizationDoc.jobsPublished ? organizationDoc.jobsPublished : []
        const jobsUnpublishedIds = organizationDoc.jobsUnpublished
          ? organizationDoc.jobsUnpublished
          : []

        // Filter out the deleted job IDs
        const updatedJobsPublishedIds = jobsPublishedIds.filter(
          (jobId) => !deletedJobIds.has(jobId as string),
        )
        const updatedJobsUnpublishedIds = jobsUnpublishedIds.filter(
          (jobId) => !deletedJobIds.has(jobId as string),
        )

        // Update the organization document with the cleaned jobs array

        await payload.update({
          collection: 'organizations',
          id: organization.id === undefined ? organization : organization.id,
          data: {
            jobsPublished: updatedJobsPublishedIds.filter((jobId) =>
              jobsPublishedIds.includes(jobId),
            ),
            jobsUnpublished: updatedJobsUnpublishedIds.filter((jobId) =>
              jobsUnpublishedIds.includes(jobId),
            ),
          },
        })

        // Clear the set after the update
        deletedJobIds.clear()
      } catch (error) {
        // Log the error if the update fails
        console.error("Error updating organization's jobs:", error)
      }
    }, 100)
  }
}

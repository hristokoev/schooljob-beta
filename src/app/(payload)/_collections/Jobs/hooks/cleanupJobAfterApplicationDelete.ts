import { CollectionAfterDeleteHook } from 'payload'

const deletedApplicationIds = new Set<string | number>()

export const cleanupJobAfterApplicationDelete: CollectionAfterDeleteHook = async ({
  req: { payload },
  id,
  doc,
}) => {
  const { job } = doc

  // Add the deleted application ID to the set
  deletedApplicationIds.add(id)

  // Debounce-like mechanism to process batch deletions
  if (deletedApplicationIds.size === 1) {
    // Wait for the next tick to batch collect deletions
    setTimeout(async () => {
      try {
        // Get the job document to update the applications array
        const jobDoc = (await payload.findByID({
          collection: 'jobs',
          id: job.id === undefined ? job : job.id,
          depth: 0,
        })) as { applications: string[] }

        // If the job document is not found, throw an error
        if (!jobDoc) {
          throw new Error('Job not found')
        }

        // Get the applications array from the job document
        const applicationIds = jobDoc.applications ? jobDoc.applications : []

        // Filter out the deleted application IDs
        const updatedApplications = applicationIds.filter(
          (applicationId: string) => !deletedApplicationIds.has(applicationId),
        )

        // Update the job document with the cleaned applications array
        await payload.update({
          collection: 'jobs',
          id: job.id === undefined ? job : job.id,
          data: {
            applications: updatedApplications,
          },
        })

        // Clear the set after the update
        deletedApplicationIds.clear()
      } catch (error) {
        // Log the error if the update fails
        console.error("Error updating job's applications:", error)
      }
    }, 100)
  }
}

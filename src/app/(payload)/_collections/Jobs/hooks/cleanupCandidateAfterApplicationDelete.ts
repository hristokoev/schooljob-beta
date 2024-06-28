import { CollectionAfterDeleteHook } from 'payload'

const deletedApplicationIds = new Set<string | number>()

export const cleanupCandidateAfterApplicationDelete: CollectionAfterDeleteHook = async ({
  req: { payload },
  id,
  doc,
}) => {
  const { candidate } = doc

  // For anonymous applications, the cleanup is not required
  if (!candidate) {
    return
  }

  // Add the deleted application ID to the set
  deletedApplicationIds.add(id)

  // Debounce-like mechanism to process batch deletions
  if (deletedApplicationIds.size === 1) {
    // Wait for the next tick to batch collect deletions
    setTimeout(async () => {
      try {
        // Get the candidate document to update the applications array
        const candidateDoc = (await payload.findByID({
          collection: 'candidates',
          id: candidate.id === undefined ? candidate : candidate.id,
          depth: 0,
        })) as { applications: string[] }

        // If the candidate document is not found, throw an error
        if (!candidateDoc) {
          throw new Error('Candidate not found')
        }

        // Get the applications array from the candidate document
        const applicationIds = candidateDoc.applications ? candidateDoc.applications : []

        // Filter out the deleted application IDs
        const updatedApplications = applicationIds.filter(
          (applicationId) => !deletedApplicationIds.has(applicationId),
        )

        // Update the candidate document with the cleaned applications array
        await payload.update({
          collection: 'candidates',
          id: candidate.id === undefined ? candidate : candidate.id,
          data: {
            applications: updatedApplications,
          },
        })

        // Clear the set after the update
        deletedApplicationIds.clear()
      } catch (error) {
        // Log the error if the update fails
        console.error("Error updating candidate's applications:", error)
      }
    }, 100)
  }
}

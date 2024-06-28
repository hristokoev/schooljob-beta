import type { CollectionAfterChangeHook } from 'payload'

export const populateCandidateApplications: CollectionAfterChangeHook = async ({
  doc,
  req: { payload },
  operation,
}) => {
  const { id, candidate } = doc

  // For anonymous applications, the candidate field is not populated
  if (!candidate) {
    return doc
  }

  if (operation === 'create') {
    try {
      const candidateDoc = await payload.findByID({
        collection: 'candidates',
        id: candidate.id === undefined ? candidate : candidate.id,
        depth: 0,
      })

      if (!candidateDoc) {
        throw new Error('Candidate not found')
      }

      const applicationIds = candidateDoc.applications ? candidateDoc.applications : []

      await payload.update({
        collection: 'candidates',
        id: candidate.id === undefined ? candidate : candidate.id,
        data: {
          applications: candidateDoc.applications ? [...applicationIds, id] : [id],
        },
      })
    } catch (error) {
      console.error("Error updating candidate's applications:", error)
    }
  }

  return doc
}

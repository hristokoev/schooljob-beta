import type { CollectionAfterChangeHook } from 'payload'

export const populateOrganizationJobs: CollectionAfterChangeHook = async ({
  doc,
  req: { payload },
  operation,
  context
}) => {
  const { id, organization } = doc

  if (operation === 'create') {
    try {
      const organizationDoc = await payload.findByID({
        collection: 'organizations',
        id: organization.id === undefined ? organization : organization.id,
        depth: 0,
      })

      if (!organizationDoc) {
        throw new Error('Organization not found')
      }

      const jobsUnpublishedIds = organizationDoc.jobsUnpublished
        ? organizationDoc.jobsUnpublished
        : []

      await payload.update({
        collection: 'organizations',
        id: organization.id === undefined ? organization : organization.id,
        data: {
          jobsUnpublished: organizationDoc.jobsUnpublished ? [...jobsUnpublishedIds, id] : [id],
        },
      })

      // Put the current quantity of allowed jobs in context
      context.jobsAllowed = organizationDoc.jobsAllowed
    } catch (error) {
      console.error("Error updating organization's jobs:", error)
    }
  }

  return doc
}

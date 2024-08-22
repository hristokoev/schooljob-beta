import type { CollectionAfterChangeHook } from 'payload'

export const updateOrganizationJobsAllowed: CollectionAfterChangeHook = async ({ doc, previousDoc, req: { payload, user }, operation, context }) => {
    if (user) {
        if (operation === 'create') {
            try {
                await payload.update({
                    collection: 'organizations',
                    id: typeof doc.organization === 'string' ? doc.organization : doc.organization.id,
                    data: {
                        jobsAllowed: context.jobsAllowed as number - 1,
                    },
                    depth: 0,
                })
            } catch (error) {
                throw new Error('Error creating organization: ' + error)
            }

            return doc
        } else if (operation === 'update' && previousDoc.status === 'expired') {
            try {
                await payload.update({
                    collection: 'organizations',
                    id: typeof doc.organization === 'string' ? doc.organization : doc.organization.id,
                    data: {
                        jobsAllowed: doc.organization.jobsAllowed - 1,
                    },
                    depth: 0,
                })
            } catch (error) {
                throw new Error('Error updating organization: ' + error)
            }
        }
    }

    return doc
}

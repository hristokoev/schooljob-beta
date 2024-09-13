import type { CollectionAfterChangeHook } from 'payload'

export const updateOrganizationJobsAllowed: CollectionAfterChangeHook = async ({ doc, req: { payload, user }, operation, context }) => {
    if (operation === 'create') {
        if (user) {
            try {
                await payload.update({
                    collection: 'organizations',
                    id: typeof doc.organization === 'string' ? doc.organization : doc.organization.id,
                    data: {
                        jobsAllowed: context.jobsAllowed as number + doc.count,
                    },
                    depth: 0,
                })
            } catch (error) {
                throw new Error('Error updating organization: ' + error)
            }

            return doc
        }
    }

    return doc
}

import type { CollectionBeforeChangeHook } from 'payload'

export const populateEmail: CollectionBeforeChangeHook = async ({ data, req: { payload, user }, operation }) => {
  if (operation === 'create') {
    if (user) {
      const organizationDoc = await payload.findByID({
        collection: 'organizations',
        id: typeof data.organization === 'string' ? data.organization : data.organization.id,
        depth: 0,
        overrideAccess: false,
        user,
      })

      data.email = organizationDoc.email

      return data
    }
  }

  return data
}

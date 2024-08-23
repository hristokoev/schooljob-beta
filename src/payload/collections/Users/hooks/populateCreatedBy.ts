import type { CollectionAfterChangeHook } from 'payload'

export const populateCreatedBy: CollectionAfterChangeHook = async ({
  doc,
  req,
  req: { payload, user },
  operation,
}) => {
  const { id, profile, role } = doc
  if (role === 'super-admin' || role === 'admin') return

  if (operation === 'create') {
    await payload.update({
      req,
      collection: profile.relationTo,
      id: profile.value.id === undefined ? profile.value : profile.value.id,
      data: {
        createdBy: user ? user.id : id,
      },
    })
  }

  return doc
}

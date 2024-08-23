import type { CollectionBeforeChangeHook } from 'payload'

export const populatePublicId: CollectionBeforeChangeHook = async ({
  data,
  req: { user, payload },
  operation,
}) => {
  const globalsData = await payload.findGlobal({
    slug: 'data',
  })
  const publicId = globalsData.lastPublicJobId || 10000

  if (operation === 'create') {
    if (user) {
      data.publicId = publicId + 1

      return data
    }
  }

  return data
}

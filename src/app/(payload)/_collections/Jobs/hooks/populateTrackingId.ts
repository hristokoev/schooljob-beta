import type { CollectionBeforeChangeHook } from 'payload'

export const populateTrackingId: CollectionBeforeChangeHook = async ({
  data,
  req: { payload },
  operation,
}) => {
  const globalsData = await payload.findGlobal({
    slug: 'data',
  })
  const trackingId = globalsData.lastApplicationTrackingId || 10000

  if (operation === 'create') {
    data.trackingId = trackingId + 1

    return data
  }

  return data
}

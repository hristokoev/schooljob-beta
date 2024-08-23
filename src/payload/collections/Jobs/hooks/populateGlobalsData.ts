import type { CollectionAfterChangeHook } from 'payload'

export const populateGlobalsDataJobs: CollectionAfterChangeHook = async ({
  doc,
  req: { payload },
  operation,
}) => {
  if (operation === 'create') {
    await payload.updateGlobal({
      slug: 'data',
      data: {
        lastPublicJobId: doc.publicId,
      },
    })
  }

  return doc
}

export const populateGlobalsDataApplications: CollectionAfterChangeHook = async ({
  doc,
  req: { payload },
  operation,
}) => {
  if (operation === 'create') {
    await payload.updateGlobal({
      slug: 'data',
      data: {
        lastApplicationTrackingId: doc.trackingId,
      },
    })
  }

  return doc
}

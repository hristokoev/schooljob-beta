import type { CollectionAfterChangeHook } from 'payload'

import { revalidate } from '@/payload/utilities'

export const revalidateJobAfterChange: CollectionAfterChangeHook = ({ doc, req: { payload }, operation }) => {
  const { status } = doc
  if (operation === 'create' || operation === 'update') {
    if (status === 'published') {
      revalidate({ payload, collection: 'jobs', slug: doc.slug })
    }
  }

  return doc
}

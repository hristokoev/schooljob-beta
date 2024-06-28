import type { CollectionAfterChangeHook } from 'payload'

import { revalidate } from '@/payload/utilities'

export const revalidateJobAfterChange: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  if (doc.status === 'published') {
    revalidate({ payload, collection: 'jobs', slug: doc.slug })
  }

  return doc
}

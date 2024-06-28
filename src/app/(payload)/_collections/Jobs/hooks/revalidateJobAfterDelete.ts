import type { CollectionAfterDeleteHook } from 'payload'

import { revalidate } from '@/payload/utilities'

export const revalidateJobAfterDelete: CollectionAfterDeleteHook = ({ doc, req: { payload } }) => {
  revalidate({ payload, collection: 'jobs', slug: doc.slug })
}

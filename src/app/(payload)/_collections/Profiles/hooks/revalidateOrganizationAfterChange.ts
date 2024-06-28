import type { CollectionAfterChangeHook } from 'payload'

import { revalidate } from '@/payload/utilities'

export const revalidateOrganizationAfterChange: CollectionAfterChangeHook = ({
  doc,
  req: { payload },
  operation,
}) => {
  if (operation === 'create' || operation === 'update') {
    revalidate({ payload, collection: 'organizations', slug: doc.slug })
  }

  return doc
}

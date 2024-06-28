import type { CollectionAfterDeleteHook } from 'payload/'

import { revalidate } from '@/payload/utilities'

export const revalidateOrganizationAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
}) => {
  revalidate({ payload, collection: 'organizations', slug: doc.slug })
}

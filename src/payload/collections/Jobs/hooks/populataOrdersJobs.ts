import type { CollectionAfterChangeHook } from 'payload'

export const populateOrdersJobs: CollectionAfterChangeHook = async ({
  doc,
  req: { payload },
  operation,
}) => {
  if (operation === 'create') {
    const { id, order } = doc

    await payload.update({
      collection: 'orders',
      id: typeof order === 'string' ? order : order.id,
      data: {
        jobs: order.jobs ? [...order.jobs, id] : [id],
      },
    })
  }

  return doc
}

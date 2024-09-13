import type { CollectionAfterChangeHook } from 'payload'

export const populateGlobalsDataOrders: CollectionAfterChangeHook = async ({ doc, req: { payload }, operation, context }) => {
  if (operation === 'create') {
    await payload.updateGlobal({
      slug: 'data',
      data: {
        dailyOrders: context.dailyOrders as number
      },
    })
  }

  return doc
}


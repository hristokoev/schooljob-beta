import type { CollectionBeforeChangeHook } from 'payload'

// Get current date in YYMMDD format using UTC
function generateOrderId(): string {
  const now = new Date()
  const datePart = now.getUTCFullYear().toString().slice(-2) +
    (now.getUTCMonth() + 1).toString().padStart(2, '0') +
    now.getUTCDate().toString().padStart(2, '0')

  return datePart
}

export const populateOrderId: CollectionBeforeChangeHook = async ({ data, req: { user, payload }, operation, context }) => {
  const globalsData = await payload.findGlobal({
    slug: 'data',
  })
  const dailyOrders = globalsData.dailyOrders || 0

  context.dailyOrders = dailyOrders + 1

  if (operation === 'create') {
    if (user) {
      data.orderId = `${generateOrderId()}${String(context.dailyOrders).padStart(4, '0')}`

      return data
    }
  }

  return data
}

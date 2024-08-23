import type { CollectionBeforeChangeHook } from 'payload'

export const populateCreatedBy: CollectionBeforeChangeHook = ({
  data,
  req: { user },
  operation,
}) => {
  if (operation === 'create') {
    if (user) {
      data.createdBy = user.id

      return data
    }
  }

  return data
}

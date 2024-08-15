import type { CollectionBeforeChangeHook } from 'payload'

export const populateEmail: CollectionBeforeChangeHook = ({
  data,
  req: { user },
  operation,
}) => {
  if (operation === 'create') {
    if (user) {
      data.email = user.email

      return data
    }
  }

  return data
}

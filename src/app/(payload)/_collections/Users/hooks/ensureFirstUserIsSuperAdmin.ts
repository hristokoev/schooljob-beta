import type { FieldHook } from 'payload'

import type { User } from '@payload-types'

// ensure the first user created is a super-admin
// 1. lookup a single user on create as succinctly as possible
// 2. if there are no users found, ensure the `super-admin` role is added
// access control is already handled by this fields `access` property
// it ensures that only super-admins can create and update the `role` field
export const ensureFirstUserIsSuperAdmin: FieldHook<User> = async ({ req, operation, value }) => {
  if (operation === 'create') {
    const users = await req.payload.find({ collection: 'users', limit: 0, depth: 0 })

    if (users.totalDocs === 0) {
      // if `super-admin` not as a role, add it
      if (!value) {
        return 'super-admin'
      }
    }
  }

  return value
}

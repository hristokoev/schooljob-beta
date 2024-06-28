import { type User } from '@payload-types'

export const checkRole = (role: User['role'], user?: User) => {
  if (user) {
    if (user?.role === role) return true
  }

  return false
}

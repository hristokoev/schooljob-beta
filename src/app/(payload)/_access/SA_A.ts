/*
    Access control for super-admins and all admins.
*/

import { type Access, checkRole } from '@/payload/access'

export const SA_A: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole('super-admin', user) || checkRole('admin', user)) {
      return true
    }
  }

  return false
}

/*
    Access control for super-admins, admins and all organizations.
*/

import { type Access, checkRole } from '@/payload/access'

export const SA_A_O: Access = ({ req: { user } }) => {
  if (user) {
    if (
      checkRole('super-admin', user) ||
      checkRole('admin', user) ||
      checkRole('organization', user)
    ) {
      return true
    }
  }

  return false
}

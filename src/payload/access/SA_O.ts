/*
    Access control for super-admins and all organizations.
*/

import { type Access, checkRole } from '@/payload/access'

export const SA_O: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole('super-admin', user) || checkRole('organization', user)) {
      return true
    }
  }

  return false
}

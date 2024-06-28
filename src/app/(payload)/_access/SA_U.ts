/*
    Access control for super-admins and unregisterd users.
*/

import { type Access, checkRole } from '@/payload/access'

export const SA_U: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole('super-admin', user)) {
      return true
    } else {
      return false
    }
  }

  return true
}

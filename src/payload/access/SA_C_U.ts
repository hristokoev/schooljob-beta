/*
    Access control for super-admins, candidates and unregisterd users.
*/

import { type Access, checkRole } from '@/payload/access'

export const SA_C_U: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole('super-admin', user) || checkRole('candidate', user)) {
      return true
    } else {
      return false
    }
  }

  return true
}

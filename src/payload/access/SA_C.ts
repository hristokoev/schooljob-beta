/*
    Access control for super-admins and all candidates.
*/

import { type Access, checkRole } from '@/payload/access'

export const SA_C: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole('super-admin', user) || checkRole('candidate', user)) {
      return true
    }
  }

  return false
}

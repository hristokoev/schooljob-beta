/*
    Access control for super-admins only.
*/

import { type Access, checkRole } from '@/payload/access'
import { User } from '@payload-types'

export const SA: Access = ({ req }) => {
  const user = req.user as User
  return checkRole('super-admin', user)
}

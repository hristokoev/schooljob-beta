/*
    Access control for super-admins only.
*/

import { User } from '@payload-types'

import { type Access, checkRole } from '@/payload/access'

export const SA: Access = ({ req }) => {
  const user = req.user as User

  return checkRole('super-admin', user)
}

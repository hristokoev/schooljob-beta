/*
    Access control for super-admins and only the admin that is logged in.
    Determined by the 'id' field in the document.
    
    IMPORTANT: This cannot be used as a field-level access control, only as a collection-level access control.
*/

import type { Access } from 'payload'

import { checkRole } from '@/payload/access'

export const SA_A_Self: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole('super-admin', user)) {
      return true
    } else if (checkRole('admin', user)) {
      return {
        id: {
          equals: user.id,
        },
      }
    }
  }

  return false
}

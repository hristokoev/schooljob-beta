/*
    Access control for super-admins, admins and only the organization that has created the document.
    Determined by the 'createdBy' field in the document.
    
    IMPORTANT: This cannot be used as a field-level access control, only as a collection-level access control.
*/

import type { Access } from 'payload'

import { checkRole } from '@/payload/access'

export const SA_A_O_Self: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole('super-admin', user) || checkRole('admin', user)) {
      return true
    } else if (checkRole('organization', user)) {
      return {
        createdBy: {
          equals: user.id,
        },
      }
    }
  }

  return false
}

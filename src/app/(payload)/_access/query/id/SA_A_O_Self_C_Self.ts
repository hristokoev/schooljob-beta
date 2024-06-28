/*
    Access control for super-admins, admins and only the organization/candidate that is logged in.
    Determined by the 'id' field in the document.
    
    IMPORTANT: This cannot be used as a field-level access control, only as a collection-level access control.
*/

import type { Access } from 'payload'

import { checkRole } from '@/payload/access'

export const SA_A_O_Self_C_Self: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole('super-admin', user) || checkRole('admin', user)) {
      return true
    }

    return {
      id: {
        equals: user.id,
      },
    }
  }

  return false
}

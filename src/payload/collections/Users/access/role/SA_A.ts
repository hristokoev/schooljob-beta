/*
    Access control for super-admins and admins. The admin doesn't have access to super-admins.
    Determined by the 'role' field in the document.
    
    IMPORTANT: This cannot be used as a field-level access control, only as a collection-level access control.
*/

import type { Access } from 'payload'

import { checkRole } from '@/payload/access'

export const SA_A: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole('super-admin', user)) {
      return true
    } else if (checkRole('admin', user)) {
      return {
        and: [
          {
            role: {
              not_equals: 'super-admin',
            },
          },
          {
            role: {
              not_equals: 'admin',
            },
          },
        ],
      }
    }
  }

  return false
}

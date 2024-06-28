/*
    Access control for super-admins, admins, organizations and only the candidate that is logged in OR the organization
    that has applications related to the candidate.

    IMPORTANT: This cannot be used as a field-level access control, only as a collection-level access control.
*/

import type { Access } from 'payload'

import { checkRole } from '@/payload/access'

const SA_A_O_C_Self: Access = ({ req: { user } }) => {
  if (user) {
    if (
      checkRole('super-admin', user) ||
      checkRole('admin', user) ||
      checkRole('organization', user)
    ) {
      return true
    }

    if (user.profile) {
      return {
        id: {
          equals:
            typeof user.profile.value === 'string' ? user.profile.value : user.profile.value.id,
        },
      }
    }
  }

  return false
}

export default SA_A_O_C_Self

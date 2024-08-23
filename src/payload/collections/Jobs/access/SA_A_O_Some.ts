/*
    Access control for super-admins, admins and only the organization that has jobs related to the applications.

    This basically means that the candidate can only see their own applications and the organization can only see
    the application of candidates that have applied to their jobs.
    
    IMPORTANT: This cannot be used as a field-level access control, only as a collection-level access control.
*/

import type { Access } from 'payload'

import { checkRole } from '@/payload/access'

const SA_A_O_Some: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole('super-admin', user) || checkRole('admin', user)) {
      return true
    }

    if (user.profile) {
      return {
        'job.organization.id': {
          equals:
            typeof user.profile.value === 'string' ? user.profile.value : user.profile.value.id,
        },
      }
    }
  }

  return false
}

export default SA_A_O_Some

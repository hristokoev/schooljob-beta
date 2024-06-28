/*
    Access control for super-admins, admins and only the candidate that has created the document OR the organization
    that has jobs related to the applications.

    This basically means that the candidate can only see their own applications and the organization can only see
    the application of candidates that have applied to their jobs.
    
    IMPORTANT: This cannot be used as a field-level access control, only as a collection-level access control.
*/

import type { Access, Where } from 'payload'

import { checkRole } from '@/payload/access'

const SA_A_O_Some_C_Self: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole('super-admin', user) || checkRole('admin', user)) {
      return true
    }

    if (user.profile) {
      return {
        or: [
          /* Candidate can only see their own applications. */
          {
            'candidate.id': {
              equals:
                typeof user.profile.value === 'string' ? user.profile.value : user.profile.value.id,
            },
          },
          /* Organization can only see applications for their own jobs. */
          {
            'job.organization.id': {
              equals:
                typeof user.profile.value === 'string' ? user.profile.value : user.profile.value.id,
            },
          },
        ] as Where[],
      }
    }
  }

  return false
}

export default SA_A_O_Some_C_Self

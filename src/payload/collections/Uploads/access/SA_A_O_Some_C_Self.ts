/*
    Access control for super-admins, admins, organizations and only the candidate that has created the document.
    The organizations can only see CVs from applicants that have applied to their job postings.
  
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
          /* Organizations can see CVs from applicants that have applied to their job postings. */
          {
            organization: {
              equals:
                typeof user.profile.value === 'string' ? user.profile.value : user.profile.value.id,
            },
          },
          /* Candidate can only see their own CVs. */
          {
            createdBy: {
              equals: user.id,
            },
          },
        ] as Where[],
      }
    }
  }

  return false
}

export default SA_A_O_Some_C_Self

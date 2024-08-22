/*
    Access control for super-admins and all organizations. Organizations won't be able to create jobs if they've reached their job limit.
*/

import { type Access, checkRole } from '@/payload/access'
import { isOrganization } from '@/utilities/getRole'

export const SA_O_jobsAllowed: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole('super-admin', user)) {
      return true
    }

    if (checkRole('organization', user) && isOrganization(user)) {
      if (user.profile.value.jobsAllowed > 0) {
        return true
      }
    }
  }

  return false
}

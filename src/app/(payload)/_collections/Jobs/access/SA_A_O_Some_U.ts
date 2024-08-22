import type { Access, Where } from 'payload'
import type { User } from '@payload-types'

import { checkRole } from '@/payload/access'

const SA_A_O_Some_U: Access = ({ req }) => {
  const user = req.user as User

  // Anonymous users can only see published jobs
  if (!user) {
    return {
      status: {
        equals: 'published',
      },
    }
  }

  // Super-admins and admins can access all jobs
  if (checkRole('super-admin', user) || checkRole('admin', user)) {
    return true
  }

  if (user.profile) {
    // Organizations can see their own unpublished jobs and all published jobs
    if (checkRole('organization', user)) {
      const organizationId = typeof user.profile.value === 'string'
        ? user.profile.value
        : user.profile.value?.id

      // Ensure organizationId is defined
      if (organizationId) {
        return {
          or: [
            {
              'organization.id': {
                equals: organizationId,
              },
            },
            {
              status: {
                equals: 'published',
              },
            },
          ],
        }
      }
    }

    // Candidates and other logged-in users can only see published jobs
    return {
      status: {
        equals: 'published',
      },
    } as Where
  }

  // Default fallback - no access
  return false
}

export { SA_A_O_Some_U }

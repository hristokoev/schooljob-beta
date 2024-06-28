/*
    THIS IS A SPECIAL ACCESS CONTROL FOR DRAFTS

    The drafts version of the Jobs collection is only accessible by super-admins, admins and the organization that creted the job.
    The published version is accessible by everyone.

   IMPORTANT: This cannot be used as a field-level access control, only as a collection-level access control.
*/

import type { Access } from 'payload'

import { checkRole } from '@/payload/access'
import type { User } from '@payload-types'

const SA_A_O_Some_U: Access = ({ req }) => {
  const user = req.user as User
  const url = req.url
  const isAdminPanel = url?.includes(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/admin/`)

  /* For all anonymous users */
  if (!user) {
    return {
      status: {
        equals: 'published',
      },
    }
  }

  /* For super-admins and admins */
  if (checkRole('super-admin', user) || checkRole('admin', user)) {
    return true
  }

  if (user.profile) {
    /* Inside the admin panel organizations can only see their own jobs and candidates can only see published jobs */
    if (isAdminPanel) {
      if (checkRole('organization', user)) {
        return {
          'organization.id': {
            equals:
              typeof user.profile.value === 'string' ? user.profile.value : user.profile.value.id,
          },
        }
      }

      return {
        status: {
          equals: 'published',
        },
      }
    }

    /* Organizations on the frontend can see their own unpublished jobs and the rest of the published jobs */
    if (checkRole('organization', user)) {
      return {
        or: [
          {
            'organization.id': {
              equals:
                typeof user.profile.value === 'string' ? user.profile.value : user.profile.value.id,
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

    /* For candidates on the frontend */
    return {
      status: {
        equals: 'published',
      },
    }
  }

  return false
}

export default SA_A_O_Some_U

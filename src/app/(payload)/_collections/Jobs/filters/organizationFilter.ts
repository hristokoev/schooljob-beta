/*
  This filter is used in the Jobs collection to filter the available organizations in the dropdown.
*/

import { checkRole } from '@/payload/access'
import { User } from '@payload-types'
import { FilterOptions, FilterOptionsProps, Where } from 'payload'

export const organizationFilter: (
  options: FilterOptionsProps<any>,
) => boolean | Where | Promise<boolean | Where> = ({ user }) => {
  /*
    When the Jobs collection is updated via a hook, 'user' is null.
    In this case, we allow the update to go through and all organizations will be available.
  */
  if (user === null) {
    return true
  }

  /* Super-admins and admins can see all organizations */
  if (checkRole('super-admin', user as User) || checkRole('admin', user as User)) return true

  if (user.profile) {
    /* Organizations can only see their own organization */
    return {
      id: {
        equals: typeof user.profile.value === 'string' ? user.profile.value : user.profile.value.id,
      },
    }
  }

  return false
}

export const filter: FilterOptions = ({ data }) => {
  return {
    stock: { greater_than: data.salary },
  }
}

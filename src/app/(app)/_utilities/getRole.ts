import { Candidate, Organization, User } from '@payload-types'

const isCandidate = (user: User): user is User & { profile: { value: Candidate } } => {
  return user.role === 'candidate'
}

const isOrganization = (user: User): user is User & { profile: { value: Organization } } => {
  return user.role === 'organization'
}

export { isCandidate, isOrganization }

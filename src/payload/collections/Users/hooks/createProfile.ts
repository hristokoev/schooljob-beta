import type { CollectionBeforeChangeHook } from 'payload'

export const createProfile: CollectionBeforeChangeHook = async ({
  data,
  req,
  req: { payload },
  operation,
}) => {
  const { email, role, title, firstName, lastName, vatId } = data as {
    email: string
    role: string
    title: string
    firstName: string
    lastName: string
    vatId: string
  }

  let profileId: string | null = null

  if (operation === 'create') {
    if (role === 'candidate') {
      // Create a profile for the candidate
      const candidateProfile = await payload.create({
        req,
        collection: 'candidates',
        data: {
          email,
          firstName,
          lastName,
        },
      })
      profileId = candidateProfile.id
    } else if (role === 'organization') {
      // Create a profile for the organization
      const organizationProfile = await payload.create({
        req,
        collection: 'organizations',
        data: {
          title,
          email,
          jobsAllowed: 0,
          vatId,
        },
      })
      profileId = organizationProfile.id
    }

    if (profileId) {
      data.profile = {
        relationTo: `${role}s`,
        value: profileId,
      }
    }
  }

  return data
}

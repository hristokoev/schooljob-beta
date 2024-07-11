import React from 'react'

import { getMeUser } from '@/utilities/getMeUser'

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access your account.',
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  return children
}

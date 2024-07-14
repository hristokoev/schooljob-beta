import React from 'react'
import { redirect } from 'next/navigation'

import { getMeUser } from '@/utilities/getMeUser'

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access your account.',
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  if (user.role === 'super-admin' || user.role === 'admin') {
    redirect('/admin')
  }

  return children
}

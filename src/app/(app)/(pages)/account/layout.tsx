import React from 'react'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { getMeUser } from '@/utilities/getMeUser'

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations()
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      t('authentication.errors.unauthorized'),
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  if (user.role === 'super-admin' || user.role === 'admin') {
    redirect('/admin')
  }

  return children
}

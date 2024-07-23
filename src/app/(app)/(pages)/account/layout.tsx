import React from 'react'
import { redirect } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { getMeUser } from '@/utilities/getMeUser'

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations()
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      t('authentication.unauthorized'),
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  if (user.role === 'super-admin' || user.role === 'admin') {
    redirect('/admin')
  }

  return children
}

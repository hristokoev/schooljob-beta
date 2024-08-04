'use client'

import React, { Fragment, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { Message } from '@/components'
import { useAuth } from '@/providers'

export const LogoutPage: React.FC<{ className?: string }> = ({ className }) => {
  const t = useTranslations()
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess(t('logout.success'))
      } catch (_) {
        setError(t('logout.error'))
      }
    }

    performLogout()
  }, [logout, t])

  return (
    <Fragment>
      {(error || success) && <Message error={error} success={success} className={className} />}
    </Fragment>
  )
}

'use client'

import React, { Fragment, useEffect, useState } from 'react'

import { Message } from '@/components'
import { useAuth } from '@/providers'

export const LogoutPage: React.FC<{ className?: string }> = ({ className }) => {
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('You have been logged out.')
      } catch (_) {
        setError("You're already logged out.")
      }
    }

    performLogout()
  }, [logout])

  return (
    <Fragment>
      {(error || success) && <Message error={error} success={success} className={className} />}
    </Fragment>
  )
}

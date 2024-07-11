'use client'

import React, { Fragment, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'

import { Button, Input, LoadingIcon } from '@/components'
import { useAuth } from '@/providers'

const AccountPanel: React.FC = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [showSetNewPassword, setShowSetNewPassword] = useState<boolean>(false)

  const handleStatusChange = async () => {
    toast.promise(
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve('Changes saved')
        }, 1000)
      }),
      {
        loading: 'Saving changes...',
        success: 'Changes saved',
        error: 'Failed to save changes',
      },
    )
  }

  return (
    <div className="grow">
      <div className="space-y-6 p-6">
        <h2 className="mb-5 text-2xl font-bold text-slate-800">My Account</h2>
        <section>
          <h2 className="mb-1 text-xl font-bold leading-snug text-slate-800">Email</h2>
          <div className="text-sm">
            Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.
          </div>
          <div className="mt-5 flex flex-wrap">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={user?.email}
              disabled
              readOnly
            />
          </div>
        </section>
        <section>
          <h2 className="mb-1 text-xl font-bold leading-snug text-slate-800">Password</h2>
          <div className="text-sm">
            You can set a permanent password if you don&apos;t want to use temporary login codes.
          </div>
          <div className="mt-4 space-y-4">
            {showSetNewPassword && (
              <Fragment>
                <Input type="text" className="block" placeholder="New Password" autoFocus />
                <Input type="text" className="block" placeholder="Confirm New Password" />
              </Fragment>
            )}
            <Button onClick={() => setShowSetNewPassword(!showSetNewPassword)}>
              {showSetNewPassword ? 'Cancel' : 'Set New Password'}
            </Button>
          </div>
        </section>
      </div>
      <footer>
        <div className="flex flex-col border-t border-slate-200 px-6 py-5">
          <div className="flex gap-4 self-end">
            <Link href="/account">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button onClick={handleStatusChange} disabled={loading}>
              Save Changes {loading && <LoadingIcon className="ml-2 size-4" />}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export { AccountPanel }

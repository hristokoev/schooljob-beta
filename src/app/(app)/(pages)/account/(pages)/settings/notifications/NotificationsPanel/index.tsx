'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

import { Button, LoadingIcon } from '@/components'

const NotificationsPanel: React.FC = () => {
  const [comments, setComments] = useState<boolean>(true)
  const [messages, setMessages] = useState<boolean>(true)
  const [mentions, setMentions] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)

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
      {/* Panel body */}
      <div className="space-y-6 p-6">
        <h2 className="mb-5 text-2xl font-bold text-slate-800">My Notifications</h2>

        {/* General */}
        <section>
          <h3 className="mb-1 text-xl font-bold leading-snug text-slate-800">General</h3>
          <ul>
            <li className="flex items-center justify-between border-b border-slate-200 py-3">
              {/* Left */}
              <div>
                <div className="font-semibold text-slate-800">Comments and replies</div>
                <div className="text-sm">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit.
                </div>
              </div>
              {/* Right */}
              <div className="ml-4 flex items-center">
                <div className="mr-2 text-sm italic text-slate-400">{comments ? 'On' : 'Off'}</div>
                <div className="form-switch">
                  <input
                    type="checkbox"
                    id="comments"
                    className="sr-only"
                    checked={comments}
                    onChange={() => setComments(!comments)}
                  />
                  <label className="bg-slate-400" htmlFor="comments">
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    <span className="sr-only">Enable smart sync</span>
                  </label>
                </div>
              </div>
            </li>
            <li className="flex items-center justify-between border-b border-slate-200 py-3">
              {/* Left */}
              <div>
                <div className="font-semibold text-slate-800">Messages</div>
                <div className="text-sm">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit.
                </div>
              </div>
              {/* Right */}
              <div className="ml-4 flex items-center">
                <div className="mr-2 text-sm italic text-slate-400">{messages ? 'On' : 'Off'}</div>
                <div className="form-switch">
                  <input
                    type="checkbox"
                    id="messages"
                    className="sr-only"
                    checked={messages}
                    onChange={() => setMessages(!messages)}
                  />
                  <label className="bg-slate-400" htmlFor="messages">
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    <span className="sr-only">Enable smart sync</span>
                  </label>
                </div>
              </div>
            </li>
            <li className="flex items-center justify-between border-b border-slate-200 py-3">
              {/* Left */}
              <div>
                <div className="font-semibold text-slate-800">Mentions</div>
                <div className="text-sm">
                  Excepteur sint occaecat cupidatat non in culpa qui officia deserunt mollit.
                </div>
              </div>
              {/* Right */}
              <div className="ml-4 flex items-center">
                <div className="mr-2 text-sm italic text-slate-400">{mentions ? 'On' : 'Off'}</div>
                <div className="form-switch">
                  <input
                    type="checkbox"
                    id="mentions"
                    className="sr-only"
                    checked={mentions}
                    onChange={() => setMentions(!mentions)}
                  />
                  <label className="bg-slate-400" htmlFor="mentions">
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    <span className="sr-only">Enable smart sync</span>
                  </label>
                </div>
              </div>
            </li>
          </ul>
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

export { NotificationsPanel }

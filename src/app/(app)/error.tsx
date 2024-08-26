'use client'

import React, { Fragment, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Button, Gutter, MinHeight, VerticalPadding } from '@/components'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    router.push('/404')
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <MinHeight>
      <VerticalPadding>
        <Gutter>
          <div className="space-y-4">
            <h2 className="mb-5 text-2xl font-bold text-slate-800">Something went wrong!</h2>
            {error.digest && (
              <Fragment>
                <h3 className="text-md leading-snug">
                  <span className="font-semibold">Digest</span>: {error.digest}
                </h3>
              </Fragment>
            )}
            {error.message && (
              <Fragment>
                <h3 className="text-md leading-snug">
                  <span className="font-semibold">Message</span>: {error.message}
                </h3>
              </Fragment>
            )}
            {error.name && (
              <Fragment>
                <h3 className="text-md leading-snug">
                  <span className="font-semibold">Name</span>: {error.name}
                </h3>
              </Fragment>
            )}
            <Button onClick={() => reset()}>Try again</Button>
          </div>
        </Gutter>
      </VerticalPadding>
    </MinHeight>
  )
}

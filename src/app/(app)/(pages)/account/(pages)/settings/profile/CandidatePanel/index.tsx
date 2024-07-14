'use client'

import { Controller, useForm } from 'react-hook-form'
import React, { useCallback, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Input, Label, Textarea } from '@/components'
import { CandidateFieldSchema, CandidateFormData } from '@/types'
import { updateCandidate } from 'src/app/(app)/_actions'
import { useAuth } from '@/providers'
import { Candidate, User } from '@payload-types'

const CandidatePanel: React.FC<{ user: User }> = ({ user }) => {
  const candidate = user?.profile?.value as Candidate
  const router = useRouter()

  const {
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    control,
  } = useForm<CandidateFormData>({
    resolver: zodResolver(CandidateFieldSchema),
  })

  useEffect(() => {
    if (candidate === null) {
      router.push(
        `/login?error=${encodeURIComponent(
          'You must be logged in to view this page.',
        )}&redirect=${encodeURIComponent('/account')}`,
      )
    }

    if (candidate) {
      reset({
        phone: candidate.phone || '',
        location: candidate.location || '',
        bio: candidate.bio || '',
      })
    }
  }, [reset, candidate, router])

  const onSubmit = useCallback(async (data: CandidateFormData) => {
    try {
      await toast.promise(updateCandidate(data), {
        loading: 'Submitting...',
        success: message => {
          return 'Changes saved'
        },
        error: message => `${message}`,
        richColors: true,
      })
    } catch (e) {
      toast.error('Error saving changes')
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grow">
      <div className="space-y-6 p-6">
        <h2 className="mb-5 text-2xl font-bold text-slate-800">My Profile</h2>
        <section>
          <h2 className="mb-1 text-xl font-bold leading-snug text-slate-800">Candidate Profile</h2>
          <div className="text-sm">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit.
          </div>
          <div className="mt-4 grid-cols-3 sm:grid sm:items-center sm:gap-4">
            <div>
              <Label>Phone</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <Input className="w-full" {...field} />}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => <Input className="w-full" {...field} />}
              />
            </div>
          </div>
          <div className="mt-4 grid-cols-3 sm:grid sm:items-center sm:gap-4">
            <div className="col-span-2">
              <Label>Bio</Label>
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <Textarea className="w-full" {...field} rows={5} maxLength={500} />
                )}
              />
            </div>
          </div>
        </section>
      </div>
      <footer>
        <div className="flex flex-col border-t border-slate-200 px-6 py-5">
          <div className="flex gap-4 self-end">
            <Link href="/account">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button disabled={!isDirty}>Save Changes</Button>{' '}
          </div>
        </div>
      </footer>
    </form>
  )
}

export { CandidatePanel }

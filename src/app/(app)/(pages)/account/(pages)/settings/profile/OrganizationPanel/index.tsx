'use client'

import { Controller, useForm } from 'react-hook-form'
import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, FormInputField, Label, Select, Textarea } from '@/components'
import { LexicalEditor } from '@/components'
import { Option, OrganizationFieldSchema, OrganizationFormData } from '@/types'
import { Organization, User } from '@payload-types'
import { updateOrganization } from '@/actions'
import { useAuth } from '@/providers'
import { transformToFrontend, transformToPayload } from '@/utilities/transformFields'
import { categoriesOptions } from '@/payload/data'

const OrganizationPanel: React.FC<{ user: User }> = ({ user }) => {
  const organization = user?.profile?.value as Organization
  const router = useRouter()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
    control,
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(OrganizationFieldSchema),
    defaultValues: {
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [],
            },
          ],
          direction: 'ltr',
          format: 'left',
          indent: 0,
          version: 1,
        },
      },
    },
  })

  useEffect(() => {
    if (organization === null) {
      router.push(
        `/login?error=${encodeURIComponent(
          'You must be logged in to view this page.',
        )}&redirect=${encodeURIComponent('/account')}`,
      )
    }

    if (organization) {
      reset({
        title: organization?.title || '',
        vatId: organization?.vatId || '',
        categories: transformToFrontend(organization?.categories || []) as Option[],
        location: organization?.location || '',
        phone: organization?.phone || '',
        url: organization?.url || '',
        description: organization?.description || '',
        richText: organization?.richText || {
          root: { type: '', children: [], direction: null, format: '', indent: 0, version: 0 },
        },
      })
    }
  }, [reset, organization, router])

  const onSubmit = useCallback(
    async (data: OrganizationFormData) => {
      try {
        await toast.promise(updateOrganization(data, user), {
          loading: 'Submitting...',
          success: message => {
            return 'Changes saved'
          },
          error: message => `${message}`,
          richColors: true,
        })
      } catch (e) {
        toast.error('Error submitting job')
      }
    },
    [user],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grow">
      <div className="space-y-6 p-6">
        <h2 className="mb-5 text-2xl font-bold text-slate-800">My Profile</h2>
        <section>
          <h2 className="mb-1 text-xl font-bold leading-snug text-slate-800">
            Organization Profile
          </h2>
          <div className="text-sm">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit.
          </div>
          <div className="mt-4 grid-cols-3 sm:grid sm:items-center sm:gap-4">
            <div>
              <Label>Organization Name</Label>
              <FormInputField
                type="text"
                name="title"
                register={register}
                error={errors.title}
                className="w-full"
                disabled
              />
            </div>
            <div>
              <Label>Organization Vat ID</Label>
              <FormInputField
                type="text"
                name="vatId"
                register={register}
                error={errors.vatId}
                className="w-full"
              />
            </div>
            <div>
              <Label>Categories</Label>
              <Controller
                name="categories"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    placeholder="Select categories"
                    options={categoriesOptions}
                    className={`w-full ${errors.categories ? 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25' : ''}`}
                  />
                )}
              />
            </div>
            <div>
              <Label>Location</Label>
              <FormInputField
                type="text"
                name="location"
                register={register}
                error={errors.location}
                className="w-full"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <FormInputField
                type="text"
                name="phone"
                register={register}
                error={errors.phone}
                className="w-full"
              />
            </div>
            <div>
              <Label>URL</Label>
              <FormInputField
                type="text"
                name="url"
                register={register}
                error={errors.url}
                className="w-full"
              />
            </div>
          </div>
          <div className="mt-4">
            <Label>Short Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea className="w-full" {...field} rows={3} maxLength={140} />
              )}
            />
          </div>
          <div className="mt-4">
            <Label>Full Description</Label>
            <Controller
              name="richText"
              control={control}
              render={({ field }) => (
                <LexicalEditor
                  value={field.value}
                  onChange={editorState => {
                    const jsonState = editorState.toJSON()
                    field.onChange(jsonState)
                  }}
                />
              )}
            />
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
            <Button disabled={!isDirty}>Save Changes</Button>
          </div>
        </div>
      </footer>
    </form>
  )
}

export { OrganizationPanel }

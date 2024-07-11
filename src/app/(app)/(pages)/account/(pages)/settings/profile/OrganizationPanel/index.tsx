'use client'

import { Controller, useForm } from 'react-hook-form'
import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Input, Label, Select, Textarea } from '@/components'
import { LexicalEditor } from '@/components'
import { Option, OrganizationFieldSchema, OrganizationFormData } from '@/types'
import { JobCategory, Organization } from '@payload-types'
import { fetchDocs } from '@/api'
import { updateOrganization } from '@/actions'
import { useAuth } from '@/providers'
import { transformToFrontend } from '@/utilities/transformFields'

const OrganizationPanel: React.FC = () => {
  const { user } = useAuth()
  const organization = user?.profile?.value as Organization
  const router = useRouter()
  const [jobCategories, setJobCategories] = useState<JobCategory[] | null>(null)

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(OrganizationFieldSchema),
    defaultValues: {
      richText: {
        root: {
          type: 'root', // Root type, typically 'root'
          children: [
            {
              type: 'paragraph', // Default child node type
              version: 1, // Node version
              children: [], // Default children array
              // Any additional properties required by your schema
            },
          ],
          direction: 'ltr', // Default text direction
          format: 'left', // Default text alignment
          indent: 0, // Default indentation level
          version: 1, // Version number for the root node
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

    const categories = organization?.categories?.map((category: JobCategory | string) => {
      if (typeof category === 'string') {
        return category
      }
      return category.id
    })

    if (organization) {
      reset({
        title: organization?.title || '',
        vatId: organization?.vatId || '',
        categories: transformToFrontend(categories as string[]) as Option[],
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

  const onSubmit = useCallback(async (data: OrganizationFormData) => {
    try {
      await toast.promise(updateOrganization(data), {
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
  }, [])

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
              <Controller
                name="title"
                control={control}
                render={({ field }) => <Input className="w-full" {...field} />}
              />
            </div>
            <div>
              <Label>Organization Vat ID</Label>
              <Controller
                name="vatId"
                control={control}
                render={({ field }) => <Input className="w-full" {...field} />}
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
                    options={jobCategories?.map(category => ({
                      value: category.id,
                      label: category.title,
                    }))}
                    className={`w-full ${errors.categories ? 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25' : ''}`}
                    isDisabled={!jobCategories}
                  />
                )}
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
            <div>
              <Label>Phone</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <Input className="w-full" {...field} />}
              />
            </div>
            <div>
              <Label>URL</Label>
              <Controller
                name="url"
                control={control}
                render={({ field }) => <Input className="w-full" {...field} />}
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
            <Button>Save Changes</Button>
          </div>
        </div>
      </footer>
    </form>
  )
}

export { OrganizationPanel }

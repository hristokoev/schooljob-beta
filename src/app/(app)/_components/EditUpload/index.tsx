'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

import { Button, ImageCropper } from '@/components'
import { TrashIcon } from '@heroicons/react/24/solid'
import { ImageCover, Logo } from '@payload-types'
import { cn } from '@/utilities/cn'

interface EditUploadProps {
  name: string
  image: Logo | ImageCover | null
  setImage: (image: Logo | ImageCover | null) => void
  minWidth: number
  minHeight: number
  className?: string
}

const EditUpload = ({ name, image, setImage, minWidth, minHeight, className }: EditUploadProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Fragment>
      <div className={cn('flex items-center gap-4', className)}>
        {image && image.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.url}
            alt="Logo"
            className="h-28 w-28 rounded-md border object-cover shadow-md"
          />
        ) : (
          <div className="h-28 w-28 rounded-md border bg-slate-200 shadow-md">
            <div className="flex h-full items-center justify-center text-center text-slate-400">
              No {name}
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <Button type="button" onClick={() => setIsOpen(true)}>
            {image ? `Change ${name}` : `Upload ${name}`}
          </Button>
          {image && image.id && (
            <Button
              type="button"
              size="icon"
              variant="destructive"
              onClick={() =>
                setImage({
                  id: '',
                  updatedAt: '',
                  createdAt: '',
                })
              }
            >
              <TrashIcon className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50" transition>
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <DialogPanel className="max-w-2xl space-y-4 rounded-md border border-slate-300 bg-white/90 p-6">
            <DialogTitle className="font-bold">Upload image</DialogTitle>
            <ImageCropper
              setIsOpen={setIsOpen}
              setImage={setImage}
              minWidth={minWidth}
              minHeight={minHeight}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </Fragment>
  )
}

export { EditUpload }

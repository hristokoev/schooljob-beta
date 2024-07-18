'use client'

import React, { Fragment, useRef, useState } from 'react'
import ReactCrop, { centerCrop, convertToPixelCrop, Crop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { toast } from 'sonner'

import { Button } from '@/components'
import setCanvasPreview from './utils/setCanvasPreview'
import { Logo, ImageCover } from '@payload-types'
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'

interface ImageCropperProps {
  setIsOpen: (isOpen: boolean) => void
  setImage: (image: Logo | ImageCover) => void
  minWidth: number
  minHeight: number
}

const ImageCropper = ({ setIsOpen, setImage, minWidth, minHeight }: ImageCropperProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const [imgSrc, setImgSrc] = useState('')
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  })

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const imageElement = new Image()
      const imageUrl = reader.result?.toString() || ''
      imageElement.src = imageUrl
      imageElement.addEventListener('load', e => {
        const { naturalWidth, naturalHeight } = e.currentTarget as HTMLImageElement
        if (naturalWidth < minWidth || naturalHeight < minHeight) {
          toast.error('Image must be at least 160px on each side')
          setImgSrc('')
          return
        }
      })
      setImgSrc(reader.result as string)
    }
  }

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = e.currentTarget
    const cropWidthInPercent = (minWidth / width) * 100
    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent,
      },
      minWidth / minHeight,
      width,
      height,
    )
    const centeredCrop = centerCrop(crop, width, height)
    setCrop(centeredCrop)
  }

  return (
    <Fragment>
      <div className="flex flex-col gap-4">
        <label className="cursor-pointer">
          <div className="rounded-md border border-slate-300 bg-white transition duration-100 ease-in-out hover:border-slate-300 hover:bg-slate-50">
            <div className="flex h-full gap-5 p-5">
              <div className="flex size-12 flex-none items-center justify-center rounded bg-royal-blue-500 text-white md:size-16">
                <ArrowUpTrayIcon className="h-8 w-8" />
              </div>
              <div className="flex grow flex-col justify-center space-y-1 overflow-x-hidden">
                <p className="inline font-semibold leading-snug">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                    className="w-full cursor-pointer text-sm text-slate-500 file:hidden"
                  />
                </p>
                {!imgSrc && <span className="text-slate-400">Click to upload an image</span>}
              </div>
            </div>
          </div>
        </label>
        {imgSrc && (
          <div className="flex flex-col items-center">
            <ReactCrop
              crop={crop}
              keepSelection
              aspect={minWidth / minHeight}
              minWidth={minWidth}
              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Crop"
                style={{ maxWidth: '100%' }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
        )}

        <div className="flex gap-4">
          <Button onClick={() => setIsOpen(false)} type="button" variant="outline">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (imgRef.current && previewCanvasRef.current) {
                setCanvasPreview(
                  imgRef.current,
                  previewCanvasRef.current,
                  convertToPixelCrop(crop, imgRef.current.width || 0, imgRef.current.height || 0),
                )
              }
              const dataUrl = previewCanvasRef.current?.toDataURL()
              setImage({
                id: '',
                updatedAt: '',
                createdAt: '',
                width: minWidth,
                height: minHeight,
                url: dataUrl,
              })
              setIsOpen(false)
            }}
            type="button"
          >
            Crop Image
          </Button>
        </div>

        {crop && (
          <canvas
            ref={previewCanvasRef}
            className="mt-4"
            style={{
              display: 'none',
              border: '1px solid black',
              objectFit: 'contain',
              width: 160,
              height: 160,
            }}
          />
        )}
      </div>
    </Fragment>
  )
}

export { ImageCropper }

'use server'

import { Candidate, Config, ImageCover, Logo, Organization, Photo, User } from '@payload-types'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'
import { File as PayloadFile } from 'payload'
import sharp from 'sharp'

export const uploadImage = async (imageDoc: Logo | ImageCover, user: User | null | undefined, collection: keyof Config['collections']): Promise<Logo | ImageCover | Photo | null> => {
    const t = await getTranslations()
    const id = (user?.profile?.value as Organization | Candidate).id as string

    const payload = await getPayloadHMR({
        config: configPromise,
    })

    // Decode base64 string
    const matches = imageDoc.url?.match(/^data:([A-Za-z0-9+/]+);base64,([A-Za-z0-9+/=]+)$/)

    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string')
    }

    const base64Data = matches[2]
    const buffer = Buffer.from(base64Data, 'base64')

    // Use sharp to resize and convert the image to JPEG
    const resizedBuffer = await sharp(buffer)
        .resize(imageDoc.width, imageDoc.height)
        .jpeg()
        .toBuffer()

    // Create a File object with the resized JPEG image
    const file = new File([resizedBuffer], 'image.jpg', { type: 'image/jpeg' })

    const fileData: PayloadFile = {
        data: resizedBuffer,
        mimetype: file.type,
        name: file.name,
        size: file.size,
    }

    if (id) {
        try {
            const doc = await payload.create({
                collection: collection as ('image-covers' | 'logos' | 'photos'),
                file: fileData,
                data: {
                    createdBy: user?.id
                },
                overrideAccess: false,
                user
            })

            if (!doc) {
                throw new Error(t('errors.uploadImage'))
            }

            return doc
        } catch {
            throw new Error(t('errors.uploadImage'))
        }
    }

    return null
}

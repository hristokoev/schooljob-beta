'use server'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Organization, Candidate, User, Logo, ImageCover, Photo, Config } from '@payload-types'
import { File as PayloadFile } from 'payload'
import sharp from 'sharp'

export const uploadImage = async (file: Logo | ImageCover, user: User | null | undefined, collection: keyof Config['collections']): Promise<Logo | ImageCover | Photo | null> => {
    const id = (user?.profile?.value as Organization | Candidate).id as string

    const payload = await getPayloadHMR({
        config: configPromise,
    })

    // Decode base64 string
    const matches = file.url?.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // Use sharp to resize and convert the image to JPEG
    const resizedBuffer = await sharp(buffer)
        .resize(file.width, file.height)
        .jpeg()
        .toBuffer();

    // Create a File object with the resized JPEG image
    const fileFile = new File([resizedBuffer], 'file.jpg', { type: 'image/jpeg' });

    const fileData: PayloadFile = {
        data: resizedBuffer,
        mimetype: fileFile.type,
        name: fileFile.name,
        size: fileFile.size,
    };


    if (id) {
        const doc = await payload.create({
            collection: collection as ('image-covers' | 'logos' | 'photos'),
            file: fileData,
            data: {
                createdBy: id
            },
            overrideAccess: false,
            user
        });

        if (!doc) {
            throw new Error('Error uploading image');
        }

        return doc
    }
    return null
}

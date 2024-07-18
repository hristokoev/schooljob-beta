'use server'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Candidate, Config, Cv, User } from '@payload-types'
import { File as PayloadFile } from 'payload'

export const uploadCv = async (file: Cv, user: User | null | undefined, collection: keyof Config['collections']): Promise<Cv | null> => {
    const id = (user?.profile?.value as Candidate).id as string

    const payload = await getPayloadHMR({
        config: configPromise,
    })

    const buffer = Buffer.from(file)

    // Create a File object with the resized JPEG image
    const fileFile = new File([buffer], 'file.pdf', { type: 'application/pdf' });

    const fileData: PayloadFile = {
        data: buffer,
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

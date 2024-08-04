'use server'

import { Cv, User } from '@payload-types'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'
import { File as PayloadFile } from 'payload'

export const uploadCv = async (cv: File, jobId: string, organizationId: string, user: User | null | undefined): Promise<Cv> => {
    const t = await getTranslations()
    const payload = await getPayloadHMR({
        config: configPromise,
    })

    // Convert File to ArrayBuffer and then to Buffer
    const arrayBuffer = await cv.arrayBuffer()
    const cvBuffer = Buffer.from(arrayBuffer)

    const fileData: PayloadFile = {
        data: cvBuffer,
        mimetype: cv.type,
        name: cv.name,
        size: cv.size
    }

    try {
        const doc = await payload.create({
            collection: 'cvs',
            file: fileData,
            data: {
                job: jobId,
                organization: organizationId,
                createdBy: user?.id ?? undefined
            },
            overrideAccess: false,
            user
        })

        if (!doc) {
            throw new Error(t('errors.uploadCv'))
        }

        return doc
    } catch {
        throw new Error(t('errors.uploadCv'))
    }
}

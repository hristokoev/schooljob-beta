'use server'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { User } from '@payload-types'

export const createApplication = async (data: any, user: User | null | undefined) => {
    const payload = await getPayloadHMR({
        config: configPromise,
    })

    const doc = await payload.create({
        collection: 'applications',
        data,
        user
    })

    if (!doc) {
        throw new Error('Error creating application')
    }

    return doc

}

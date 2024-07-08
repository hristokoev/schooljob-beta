'use server'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { getMeUser } from '@/utilities/getMeUser'

export const updatePassword = async (data: any) => {
    const { user } = await getMeUser()

    const payload = await getPayloadHMR({
        config: configPromise,
    })

    const doc = await payload.update({
        collection: 'users',
        id: user.id,
        data: {
            password: data.password,
        },
        user
    })

    if (!doc) {
        throw new Error('Error creating job')
    }

    return doc

}

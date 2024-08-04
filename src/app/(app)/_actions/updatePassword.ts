'use server'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'

import { getMeUser } from '@/utilities/getMeUser'

export const updatePassword = async (data: any) => {
    const t = await getTranslations()
    const { user } = await getMeUser()

    const payload = await getPayloadHMR({
        config: configPromise,
    })

    try {
        const doc = await payload.update({
            collection: 'users',
            id: user.id,
            data: {
                password: data.password,
            },
            user
        })

        if (!doc) {
            throw new Error(t('errors.updatePassword'))
        }

        return doc
    } catch (error) {
        throw new Error(t('errors.updatePassword'))
    }
}

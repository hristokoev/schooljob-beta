'use server'

import { Application } from '@payload-types'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'

import { getMeUser } from '@/utilities/getMeUser'

export const updateApplication = async (id: string, status: Application['status']) => {
    const t = await getTranslations()
    const { user } = await getMeUser()

    const payload = await getPayloadHMR({
        config: configPromise,
    })

    try {
        const doc = await payload.update({
            collection: 'applications',
            id,
            data: {
                status,
            },
            overrideAccess: false,
            user,
        })

        if (!doc) {
            throw new Error(t('errors.updatePassword'))
        }

        return doc
    } catch {
        throw new Error(t('errors.updatePassword'))
    }
}

// TODO: Fix typing and remove 'any'

'use server'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'

import { User } from '@payload-types'
import { ApplicationFormData } from '../_types'

export const createApplication = async (data: any, user: User | null | undefined) => {
    const t = await getTranslations()
    const payload = await getPayloadHMR({
        config: configPromise,
    })

    try {
        const doc = await payload.create({
            collection: 'applications',
            data,
            overrideAccess: false,
            user
        })

        if (!doc) {
            throw new Error(t('errors.createApplication'))
        }

        return doc
    } catch (error) {
        throw new Error(t('errors.createApplication'))
    }
}

// TODO: Fix typing and remove 'any'

'use server'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'
import { User } from '@payload-types'

export const createOrder = async (data: any, user: User | null | undefined) => {
    const t = await getTranslations()
    const payload = await getPayloadHMR({
        config: configPromise,
    })
    const { organization, membership, quantity, price, currency } = data

    try {
        const doc = await payload.create({
            collection: 'orders',
            data: {
                organization,
                membership,
                quantity,
                price,
                currency,
            },
            overrideAccess: false,
            user,
            depth: 0
        })

        if (!doc) {
            throw new Error(t('errors.createOrder'))
        }

        return doc
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error(t('errors.createOrder'))
        }
    }
}

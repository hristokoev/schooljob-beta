'use server'

import config from '@payload-config'
import { Config } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'

interface updateDocumentProps {
    collection: keyof Config['collections']
    id: string
    data: any
}

const updateDocument = async ({ collection, id, data }: updateDocumentProps) => {
    const payload = await getPayloadHMR({ config })
    const doc = payload.update({
        collection,
        id,
        data
    })

    return doc
}

export { updateDocument }

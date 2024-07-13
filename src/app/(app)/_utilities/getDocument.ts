
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { unstable_cache } from 'next/cache'

import type { Config } from '@payload-types'
import { getCachedPayload } from '@cached-local-api'

type Collection = keyof Config['collections']

async function getDocument(collection: Collection, slug: string, depth = 0, publicId?: string,) {
  const payload = await getPayloadHMR({ config: configPromise })

  const cachedPayload = getCachedPayload(payload)

  const page = await cachedPayload.find({
    collection,
    depth,
    where: {
      slug: {
        equals: slug,
      },
      ...(publicId ? { publicId: { equals: publicId } } : {}),
    },
  })

  return page.docs[0]
}

export { getDocument }

import type { Config } from '@payload-types'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

type Collection = keyof Config['collections']

async function getDocument(collection: Collection, slug: string, depth = 0, publicId?: string,) {
  const payload = await getPayloadHMR({ config: configPromise })

  const page = await payload.find({
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

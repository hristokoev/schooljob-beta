import { Config, FieldHook, Payload } from 'payload'
import { format } from '@/payload/utilities'

type CollectionType = keyof Config['collections']

async function isTitleFound(
  slug: string,
  collection: CollectionType,
  id: string,
  payload: Payload,
): Promise<boolean> {
  const titleFound = await payload.find({
    collection,
    where: {
      slug: { equals: slug },
      id: { not_equals: id },
    },
  })

  return titleFound.docs.length > 0
}

async function getUniqueSlug(
  slug: string,
  collection: CollectionType,
  id: string,
  payload: Payload,
): Promise<string> {
  let i = 2
  let baseSlug = slug
  const regex = /^(.*?)-(\d+)$/
  const match = slug.match(regex)

  if (match) {
    baseSlug = match[1]
    i = parseInt(match[2], 10) + 1
  }

  while (await isTitleFound(slug, collection, id, payload)) {
    slug = `${baseSlug}-${i++}`
  }

  return slug
}

export const formatSlug: FieldHook = async ({
  data,
  collection,
  operation,
  value,
  originalDoc,
  req: { payload },
}) => {
  const { title } = data as { title: string }
  const id = originalDoc?.id || ''
  const collectionSlug = (collection as CollectionType | { slug?: string }).slug as CollectionType

  if (operation === 'create') {
    return getUniqueSlug(format(title), collectionSlug, id, payload)
  }
  return value
}

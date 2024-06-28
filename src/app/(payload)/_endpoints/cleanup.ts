import payload from 'payload'
import type { PayloadHandler } from 'payload'

import { Config } from '@payload-types'

function filterData(originalDoc, collection, id, field, referenceId) {
  if (originalDoc[id]) {
    // Remove the referenceId from the specified collection
    if (originalDoc[id][collection]) {
      originalDoc[id][collection] = originalDoc[id][collection].filter(
        (item) => item !== referenceId,
      )

      // If the collection becomes empty, remove the collection
      if (originalDoc[id][collection].length === 0) {
        delete originalDoc[id][collection]
      }
    }

    // Remove the [field] from the specified id
    if (originalDoc[id][field]) {
      originalDoc[id][field] = originalDoc[id][field].filter(
        (originalField) => !field.includes(originalField),
      )

      // If the categories become empty, remove the [field] field
      if (originalDoc[id][field].length === 0) {
        delete originalDoc[id][field]
      }
    }

    // If the id object becomes empty, remove the id
    if (Object.keys(originalDoc[id]).length === 0) {
      delete originalDoc[id]
    }
  }

  return originalDoc
}

export interface Params {
  collection: keyof Config['collections']
  id: string
  field: string
  referenceId: string
}

export const cleanupRelationships: PayloadHandler = async (req, res) => {
  const { collection, id, field, referenceId } = req.body as unknown as Params

  if (!collection || !id || !field || !referenceId) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const possibleField = [
    'agreements',
    'applications',
    'candidate',
    'categories',
    'cv',
    'imageCover',
    'job',
    'logo',
    'jobsPublished',
    'jobsSaved',
    'jobsUnpublished',
    'organization',
    'photo',
  ]

  if (!possibleField.includes(field)) {
    return res.status(400).json({ error: 'Invalid field' })
  }

  try {
    const doc = await payload.findByID({
      collection: collection,
      id,
      depth: 0,
    })

    if (!doc) {
      throw new Error('Doc not found')
    }

    const docField = doc[field] as string | string[]

    await payload.update({
      collection: collection,
      id,
      data: {
        [field]:
          typeof docField === 'string' ? '' : docField.filter((docId) => docId !== referenceId),
      },
    })

    const docGlobal = await payload.findGlobal({
      slug: 'dashboard',
    })

    await payload.updateGlobal({
      slug: 'dashboard',
      data: filterData(docGlobal, id, collection, referenceId, field),
    })
  } catch (error) {
    return res.status(400).json({ error })
  }

  return res.status(200).json({ message: 'Success' })
}

import type { CollectionBeforeChangeHook } from 'payload'

import crypto from 'crypto'
import path from 'path'

export const obfuscateFilename: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (operation === 'create') {
    if (data) {
      const randomString = crypto.randomBytes(8).toString('hex')
      const extension = data.filename ? path.extname(data.filename) : ''
      const filename = `${randomString}${extension}`

      data.filename = filename.replace(/[^a-zA-Z0-9_-]/g, '_')
    }
  }

  return data
}

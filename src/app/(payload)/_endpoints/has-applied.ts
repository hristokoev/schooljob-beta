import type { PayloadHandler } from 'payload'

export interface Params {
  id: string
  email: string
}

export const hasApplied: PayloadHandler = async (req, res) => {
  const { id, email } = req.body as unknown as Params

  if (!id || !email) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const applicationDocs = await req.payload.find({
      collection: 'applications',
      where: {
        and: [{ job: { equals: id } }, { email: { equals: email } }],
      },
      depth: 0,
    })

    if (!applicationDocs) {
      return res.status(500).json({ error: 'Error fetching applications' })
    }

    if (applicationDocs.docs.length > 0) {
      return res.status(200).json({ hasApplied: true })
    } else {
      return res.status(200).json({ hasApplied: false })
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

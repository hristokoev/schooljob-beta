import type { CollectionAfterChangeHook } from 'payload'

import { revalidate } from '@/payload/utilities'

export const revalidatePath: CollectionAfterChangeHook = async ({ doc, req: { payload }, collection }) => {
  const { slug, publicId, organization } = doc

  switch (collection.slug) {
    case 'organizations': {
      // Revalidate organization page
      await revalidate({ collection: collection.slug, path: `/organizations/${slug}`, payload })

      // Revalidate associated jobs
      const associatedJobs = await payload.find({
        collection: 'jobs',
        where: {
          organization: {
            equals: doc.id,
          },
        },
      })

      for (const job of associatedJobs.docs) {
        await revalidate({ collection: 'jobs', path: `/jobs/${job.publicId}/${job.slug}`, payload })
      }

      // Revalidate home page
      await revalidate({ collection: collection.slug, path: '/', payload })
      break
    }

    case 'jobs': {
      // Revalidate job page
      await revalidate({ collection: collection.slug, path: `/jobs/${publicId}/${slug}`, payload })

      // Revalidate associated organization
      if (organization) {
        const orgDoc = await payload.findByID({
          collection: 'organizations',
          id: organization,
        })

        if (orgDoc) {
          await revalidate({ collection: 'organizations', path: `/organizations/${orgDoc.slug}`, payload })
        }
      }

      // Revalidate home page
      await revalidate({ collection: collection.slug, path: '/', payload })
      break
    }

    case 'memberships':
      // Revalidate memberships page
      await revalidate({ collection: collection.slug, path: '/pricing', payload })
      break

    case 'partners':
      // Revalidate home page
      await revalidate({ collection: collection.slug, path: '/', payload })
      break

    case 'ads':
      if (doc.page === 'home') {
        await revalidate({ collection: collection.slug, path: '/', payload })
      }

      break
  }

  return doc
}

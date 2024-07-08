import { APPLICATIONS, JOB_CATEGORIES, JOBS, ORGANIZATIONS } from '@/graphql'
import { type Config } from '@payload-types'
import { GRAPHQL_API_URL } from './shared'

// TODO: Typing

const queryMap = {
  jobs: {
    query: JOBS,
    key: 'Jobs',
  },
  'job-categories': {
    query: JOB_CATEGORIES,
    key: 'JobCategories',
  },
  organizations: {
    query: ORGANIZATIONS,
    key: 'Organizations',
  },
  applications: {
    query: APPLICATIONS,
    key: 'Applications',
  },
  candidates: {
    query: '',
    key: 'Candidates'
  },
  cvs: {
    query: '',
    key: 'Cvs'
  },
  'site-uploads': {
    query: '',
    key: 'SiteUploads'
  },
  agreements: {
    query: '',
    key: 'Agreements'
  },
  users: {
    query: '',
    key: 'Users'
  },
  'payload-preferences': {
    query: '',
    key: 'PayloadPreferences'
  },
  'payload-migrations': {
    query: '',
    key: 'PayloadMigrations'
  },
}

export const fetchDocs = async <T>(
  collection: keyof Config['collections'],
  variables?: Record<string, unknown>,
): Promise<T[]> => {
  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`)

  const docs: T[] = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: [collection] },
    cache: 'force-cache',
    body: JSON.stringify({
      query: queryMap[collection].query,
      variables,
    }),
  })
    ?.then((res) => res.json())
    ?.then((res) => {
      if (res.errors) throw new Error(res?.errors?.[0]?.message ?? 'Error fetching docs')

      return res?.data?.[queryMap[collection].key]?.docs
    })

  return docs
}

// TODO: Typing

import { JOBS, ORGANIZATIONS } from '@/graphql'
import { GRAPHQL_API_URL } from './shared'

const queryMap = {
  jobs: {
    query: JOBS,
    key: 'Jobs',
  },
  organizations: {
    query: ORGANIZATIONS,
    key: 'Organizations',
  },
}

// Object values in GraphQL queries can't have hyphens
const variablesChangeHyphenToUnderscore = (variables: Record<string, unknown>) => {
  const newVariables: Record<string, unknown> = {}

  for (const key in variables) {
    const value = variables[key]

    if (typeof value === 'string') {
      newVariables[key] = value.replace(/-/g, '_')
    } else {
      newVariables[key] = value
    }
  }

  return newVariables
}

export const fetchDocs = async <T>(
  collection: 'jobs' | 'organizations',
  variables?: Record<string, unknown>,
): Promise<T> => {
  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`)

  const docs: T = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: [collection] },
    cache: 'force-cache',
    body: JSON.stringify({
      query: queryMap[collection].query,
      ...(variables && { variables: variablesChangeHyphenToUnderscore(variables) }),
    }),
  })
    ?.then((res) => res.json())
    ?.then((res) => {
      if (res.errors) throw new Error(res?.errors?.[0]?.message ?? 'Error fetching docs')

      return res?.data?.[queryMap[collection].key]
    })

  return docs
}

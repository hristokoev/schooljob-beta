'use client'

import { BriefcaseIcon, BuildingOffice2Icon } from '@heroicons/react/24/solid'
import { Combobox, ComboboxOption } from '@headlessui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import Link from 'next/link'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

import { Input } from '@/components'

interface SearchResult {
  id: string
  slug: string
  title: string
  publicId: string
  doc: {
    relationTo: 'jobs' | 'organizations'
    value: string
  }
}

const Popup: React.FC = () => {
  const t = useTranslations()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  const fetchResults = async (searchQuery: string) => {
    setLoading(true)

    try {
      // Construct the search query
      const params = new URLSearchParams({
        limit: '6',
        search: searchQuery,
      })

      // Add the complex filter conditions
      params.append('where[or][0][and][0][title][contains]', searchQuery)
      params.append('where[or][1][and][0][keywords][contains]', searchQuery)

      const url = `/api/search?${params.toString()}`

      const response = await fetch(url)
      const data = await response.json()

      setResults(data.docs)
    } catch {
      toast.error(t('search.error'))
    } finally {
      setLoading(false)
    }
  }

  const debouncedFetchResults = useMemo(
    () =>
      debounce((query: string) => {
        fetchResults(query)
      }, 500),
    [],
  )

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text

    const regex = new RegExp(`(${query})`, 'i')
    const parts = text.split(regex)

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span key={index} className="bg-royal-blue-500 text-white">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          ),
        )}
      </>
    )
  }

  useEffect(() => {
    if (query.length > 0) {
      debouncedFetchResults(query)
    } else {
      debouncedFetchResults.cancel()
      setResults([])
    }
  }, [query])

  const categorizedResults = useMemo(() => {
    const organizations = results.filter(result => result.doc.relationTo === 'organizations')
    const jobs = results.filter(result => result.doc.relationTo === 'jobs')

    return { organizations, jobs }
  }, [results])

  return (
    <Combobox value={query} onChange={() => setQuery}>
      <div className="relative">
        <Input
          onChange={e => setQuery(e.target.value)}
          className="w-full cursor-pointer flex-row items-center rounded-sm border border-slate-300 bg-slate-200 py-3 pl-3 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-300/40"
          placeholder={t('search.placeholder')}
        />
        {loading && (
          <div className="mt-4 flex w-full flex-col gap-6 divide-y divide-slate-300 rounded-sm border border-slate-300 bg-slate-100">
            <h5 className="p-6 text-center text-xl font-bold text-slate-800">
              {t('search.loading')}
            </h5>
          </div>
        )}
        {!loading && results.length > 0 && (
          <div className="mt-4 flex w-full flex-col gap-6 divide-y divide-slate-300 rounded-sm border border-slate-300 bg-slate-100">
            {categorizedResults.organizations.length > 0 && (
              <div className="px-4 py-2">
                <h5 className="my-2 text-xl font-bold text-slate-800">{t('organizations')}</h5>
                {categorizedResults.organizations.map(organization => (
                  <ComboboxOption
                    key={organization.id}
                    value={organization}
                    className={({ active }) =>
                      `relative cursor-pointer select-none rounded-sm py-2 pl-10 pr-4 ${
                        active ? 'bg-royal-blue-500 text-white' : 'text-slate-800'
                      }`
                    }
                  >
                    <BuildingOffice2Icon className="absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 transform" />
                    <Link href={`/organizations//${organization.slug}`}>
                      <span className="block truncate font-semibold">
                        {highlightMatch(organization.title, query)}
                      </span>
                    </Link>
                  </ComboboxOption>
                ))}
              </div>
            )}
            {categorizedResults.jobs.length > 0 && (
              <div className="px-4 py-2">
                <h5 className="my-2 text-xl font-bold text-slate-800">{t('jobs')}</h5>
                {categorizedResults.jobs.map(job => (
                  <ComboboxOption
                    key={job.id}
                    value={job}
                    className={({ active }) =>
                      `relative cursor-pointer select-none rounded-sm py-2 pl-10 pr-4 ${
                        active ? 'bg-royal-blue-500 text-white' : 'text-slate-800'
                      }`
                    }
                  >
                    <BriefcaseIcon className="absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 transform" />
                    <Link href={`/jobs/${job.publicId}/${job.slug}`}>
                      <span className="block truncate font-semibold">
                        {highlightMatch(job.title, query)}
                      </span>
                    </Link>
                  </ComboboxOption>
                ))}
              </div>
            )}
          </div>
        )}
        {!loading && query && results.length === 0 && (
          <div className="mt-4 flex w-full flex-col gap-6 divide-y divide-slate-300 rounded-sm border border-slate-300 bg-slate-100">
            <div className="px-4 py-2">
              <h5 className="my-2 text-xl font-bold text-slate-800">{t('search.noResults')}</h5>
              <p className="text-slate-600">{t('search.noResultsFor', { query })}</p>
            </div>
          </div>
        )}
      </div>
    </Combobox>
  )
}

export { Popup }

'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button, Hr, Select } from '@/components'
import { Popup } from './Popup'

type Filter = {
  slug: string
  text: string
  searchable: boolean
  options: { label: string; value: string }[]
}

type Props = {
  popup?: boolean
  filters: Filter[]
  className: string
  path: string
  isMulti?: boolean
  showMore?: boolean
  resetFilters?: boolean
}

const Search: React.FC<Props> = ({
  popup = false,
  filters,
  className,
  path,
  isMulti = false,
  showMore = false,
  resetFilters = false,
}) => {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filtersToDisplay, setFiltersToDisplay] = useState<Filter[]>(
    showMore ? filters.slice(0, 5) : filters,
  )
  const [selectedValues, setSelectedValues] = useState<Record<string, any>>({})

  const hasSelectedFilters = useMemo(() => {
    return Object.values(selectedValues).some(value =>
      Array.isArray(value) ? value.length > 0 : value !== null,
    )
  }, [selectedValues])

  useEffect(() => {
    const parsedValues: Record<string, any> = {}

    filters.forEach(filter => {
      const paramValue = searchParams.get(filter.slug)

      if (paramValue) {
        const values = paramValue
          .split(',')
          .map(value => filter.options.find(option => option.value === value))
          .filter(Boolean)

        if (values.length > 0) {
          parsedValues[filter.slug] = isMulti ? values : values[0]
        }
      }
    })

    setSelectedValues(parsedValues)
  }, [filters, isMulti, searchParams])

  const handleSelectChange = (filterSlug: string, selectedOption: any) => {
    setSelectedValues(prevState => ({
      ...prevState,
      [filterSlug]: selectedOption,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const query = Object.entries(selectedValues).reduce((acc, [key, value]) => {
      if (value) {
        const values = Array.isArray(value) ? value.map(v => v.value).join(',') : value.value
        acc.push(`${key}=${encodeURIComponent(values)}`)
      }

      return acc
    }, [] as string[])

    const queryString = query.length ? `?${query.join('&')}` : ''
    router.push(`/${path}${queryString}`)
  }

  const handleShowMore = () => {
    setFiltersToDisplay(filtersToDisplay.length < filters.length ? filters : filters.slice(0, 5))
  }

  const handleResetFilters = () => {
    if (searchParams.size === 0) {
      // If there are no search params, just clear the filters without navigating
      setSelectedValues({})
    } else {
      // If there are search params, navigate to the base path
      router.push(`/${path}`)
    }
  }

  return (
    <form className="flex flex-col gap-4 bg-white" onSubmit={handleSubmit}>
      {popup && <Popup />}
      <div className={className}>
        {filtersToDisplay.map(filter => (
          <div key={filter.slug}>
            <Select
              className="w-full"
              name={filter.slug}
              options={filter.options}
              placeholder={filter.text}
              isClearable
              isSearchable={filter.searchable}
              isMulti={isMulti}
              value={selectedValues[filter.slug] || (isMulti ? [] : null)}
              onChange={(selectedOption: any) => handleSelectChange(filter.slug, selectedOption)}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {showMore && filters.length > 5 && (
          <Button className="grow" variant="link" onClick={handleShowMore} type="button">
            {filtersToDisplay.length < filters.length ? t('ui.showMore') : t('ui.showLess')}
            {filtersToDisplay.length < filters.length
              ? ` (${filters.length - filtersToDisplay.length})`
              : ''}
          </Button>
        )}
        {resetFilters && hasSelectedFilters && (
          <Button className="grow" variant="link" onClick={handleResetFilters} type="button">
            {t('ui.resetFilters')}
          </Button>
        )}
      </div>
      <Hr className="md:hidden" />
      <Button className="w-full" type="submit">
        {t('search.button')}
      </Button>
    </form>
  )
}

export { type Filter, Search }

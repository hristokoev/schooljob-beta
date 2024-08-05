'use client'

import React, { useEffect, useState } from 'react'
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
}

const Search: React.FC<Props> = ({ popup = false, filters, className, path, isMulti = false }) => {
  const t = useTranslations()
  const [filtersToDisplay, setFiltersToDisplay] = useState<Filter[]>(filters.slice(0, 5))
  const [selectedValues, setSelectedValues] = useState<Record<string, any>>({})

  useEffect(() => {
    // Parse query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search)
    const parsedValues: Record<string, any> = {}

    filters.forEach(filter => {
      const paramValue = queryParams.get(filter.slug)

      if (paramValue) {
        const values = paramValue
          .split(',')
          .map(value => {
            return filter.options.find(option => option.value === value)
          })
          .filter(Boolean)

        if (values.length > 0) {
          parsedValues[filter.slug] = isMulti ? values : values[0]
        }
      }
    })

    setSelectedValues(parsedValues)
  }, [filters, isMulti])

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
    const url = `/${path}${queryString}` // Adjust base path as needed
    window.location.href = url
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
        <div className="flex gap-2">
          {filters.length > 5 && (
            <Button
              className="grow"
              variant="link"
              onClick={() => {
                setFiltersToDisplay(
                  filtersToDisplay.length < filters.length ? filters : filters.slice(0, 5),
                )
              }}
              type="button"
            >
              {filtersToDisplay.length < filters.length ? t('ui.showMore') : t('ui.showLess')}
              {filtersToDisplay.length < filters.length
                ? ` (${filters.length - filtersToDisplay.length})`
                : ''}
            </Button>
          )}
        </div>
      </div>
      <Hr className="md:hidden" />
      <Button className="w-full" type="submit">
        {t('search.button')}
      </Button>
    </form>
  )
}

export { type Filter, Search }

'use client'

import React, { useState } from 'react'

import { Button, Hr, Input, Select } from '@/components'

type Filter = {
  slug: string
  text: string
  searchable: boolean
  options: { label: string; value: string }[]
}

const Search: React.FC<{ filters: Filter[]; path: any }> = ({ filters, path }) => {
  const [filtersToDisplay, setFiltersToDisplay] = useState<Filter[]>(filters.slice(0, 5))
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form className="flex flex-col gap-4 bg-white" onSubmit={handleSubmit}>
      <Input className="flex w-full cursor-pointer flex-row items-center rounded-sm border border-slate-300 bg-slate-200 py-3 pl-3 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-300/40" />
      <div className="grid gap-2 lg:grid-cols-6">
        <div className="grid gap-2 md:grid-cols-5 lg:col-span-5">
          {filtersToDisplay.map(filter => (
            <div key={filter.slug}>
              <Select
                className="w-full"
                name={filter.slug}
                options={filter.options}
                placeholder={filter.text}
                isClearable
                isSearchable={filter.searchable}
              />
            </div>
          ))}
        </div>
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
              {filtersToDisplay.length < filters.length ? 'Show More' : 'Show Less'}
              {filtersToDisplay.length < filters.length
                ? ` (${filters.length - filtersToDisplay.length})`
                : ''}
            </Button>
          )}
        </div>
      </div>
      <Hr className="md:hidden" />
      <Button className="w-full" type="submit">
        Search
      </Button>
    </form>
  )
}

export { type Filter, Search }

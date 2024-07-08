'use client'

import React, { useState } from 'react'

import { Button, Hr, Input, Select } from '@/components'

type Filter = {
  slug: string
  text: string
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
      <div className="flex w-full items-center">
        <Input
          onClick={() => setIsOpen(true)}
          placeholder="Search For..."
          className="w-full border-2 border-slate-200 bg-slate-100 transition-all duration-150 ease-in-out focus:border-2 focus:border-royal-blue-500 focus:bg-white focus:shadow-xl focus:shadow-royal-blue-500/25"
        />
      </div>
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
                isSearchable={false}
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

'use client'

import type { Application, Cv } from '@payload-types'
import React, { Fragment } from 'react'
import { useTranslations } from 'next-intl'

import { Button, Message, Select } from '@/components'
import { applicationStatusOptions } from '@/payload/data'
import { convertFilesize } from '@/utilities/convertFilesize'

interface Step01Props extends Application {
  setStatus: React.Dispatch<React.SetStateAction<Application['status']>>
}

const Step01: React.FC<Step01Props> = props => {
  const t = useTranslations()
  const { firstName, lastName, email, phone, location, cv, status, setStatus } = props

  const handleStatusChange = (selectedOption: { value: Application['status']; label: string }) => {
    setStatus(selectedOption.value)
  }

  return (
    <Fragment>
      <div className="mb-8 flex items-center gap-2">
        <Message
          className="w-full"
          success={status === 'accepted'}
          error={status === 'rejected'}
          warning={status === 'pending'}
          message={`${t('ui.status')}: ${t(`search.options.${status}` as 'search.status')}`}
        />
        <Select
          className="w-48"
          options={applicationStatusOptions.map(option => ({
            value: option,
            label: t(`search.options.${option}` as 'search.status'),
          }))}
          isSearchable={false}
          onChange={handleStatusChange}
          placeholder={t('ui.status')}
        />
      </div>
      <section>
        <h3 className="mb-1 text-xl font-bold leading-snug text-slate-800">
          {t('candidate.information')}
        </h3>
        <ul>
          <li className="border-b border-slate-200 py-3 md:flex md:items-center md:justify-between">
            <div className="text-sm font-medium text-slate-800">{t('candidate.firstName')}</div>
            <div className="ml-4 text-sm text-slate-600">
              <span className="mr-3">{firstName}</span>
            </div>
          </li>
          <li className="border-b border-slate-200 py-3 md:flex md:items-center md:justify-between">
            <div className="text-sm font-medium text-slate-800">{t('candidate.lastName')}</div>
            <div className="ml-4 text-sm text-slate-600">
              <span className="mr-3">{lastName}</span>
            </div>
          </li>
          <li className="border-b border-slate-200 py-3 md:flex md:items-center md:justify-between">
            <div className="text-sm font-medium text-slate-800">{t('candidate.email')}</div>
            <div className="ml-4 text-sm text-slate-600">
              <span className="mr-3">{email}</span>
            </div>
          </li>
          <li className="border-b border-slate-200 py-3 md:flex md:items-center md:justify-between">
            <div className="text-sm font-medium text-slate-800">{t('candidate.phone')}</div>
            <div className="ml-4 text-sm text-slate-600">
              <span className="mr-3">{phone}</span>
            </div>
          </li>
          <li className="border-b border-slate-200 py-3 md:flex md:items-center md:justify-between">
            <div className="text-sm font-medium text-slate-800">{t('candidate.location')}</div>
            <div className="ml-4 text-sm text-slate-600">
              <span className="mr-3">{location}</span>
            </div>
          </li>
        </ul>
      </section>
      <section>
        <h3 className="mb-1 text-xl font-bold leading-snug text-slate-800">{t('ui.files')}</h3>
        <table className="w-full table-auto">
          <thead className="text-xs uppercase text-slate-400">
            <tr className="md:flex-no-wrap flex flex-wrap md:table-row">
              <th className="block w-full py-2 text-left md:table-cell md:w-auto">
                {t('ui.filetype')}
              </th>
              <th className="hidden w-full py-2 text-left md:table-cell md:w-auto">
                {t('ui.filename')}
              </th>
              <th className="hidden w-full py-2 text-left md:table-cell md:w-auto">
                {t('ui.filesize')}
              </th>
              <th className="hidden w-full py-2 text-left md:table-cell md:w-auto">
                <div className="text-right font-semibold"></div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="md:flex-no-wrap flex flex-wrap py-2 md:table-row md:py-0">
              <td className="block w-full py-0.5 md:table-cell md:w-auto md:py-2">
                <div className="text-left font-medium text-slate-800">{t('candidate.cv')}</div>
              </td>
              <td className="block w-full py-0.5 md:table-cell md:w-auto md:py-2">
                <div className="text-left">{(cv as Cv).filename}</div>
              </td>
              <td className="block w-full py-0.5 md:table-cell md:w-auto md:py-2">
                <div className="text-left font-medium">
                  {convertFilesize((cv as Cv).filesize ?? 0)}
                </div>
              </td>
              <td className="block w-full py-0.5 md:table-cell md:w-auto md:py-2">
                <div className="flex items-center text-right md:justify-end">
                  <Button
                    className="font-medium text-royal-blue-500 hover:text-royal-blue-600"
                    variant="link"
                  >
                    <a
                      href={`/api/cvs/file/${(cv as Cv).filename}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t('ui.downloadPdf')}
                    </a>
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </Fragment>
  )
}

export { Step01 }

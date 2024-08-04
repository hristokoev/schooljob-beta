import { Application, Cv } from '@payload-types'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components'
import { convertFilesize } from '@/utilities/convertFilesize'

const ApplicationsEditView: React.FC<Application> = async application => {
  const t = await getTranslations()
  const { firstName, lastName, email, phone, location, cv } = application

  return (
    <div className="grow rounded-md border border-slate-300 bg-white">
      <div className="space-y-6 p-6">
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
                  {application && <div className="text-left">{(cv as Cv).filename}</div>}
                </td>
                <td className="block w-full py-0.5 md:table-cell md:w-auto md:py-2">
                  {application && (
                    <div className="text-left font-medium">
                      {convertFilesize((cv as Cv).filesize ?? 0)}
                    </div>
                  )}
                </td>
                <td className="block w-full py-0.5 md:table-cell md:w-auto md:py-2">
                  <div className="flex items-center text-right md:justify-end">
                    {application && (
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
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>

      <footer>
        <div className="flex flex-col border-t border-slate-200 px-6 py-5">
          <div className="flex gap-4 self-end">
            <Link href="/account/applications">
              <Button variant="outline">{t('ui.goBack')}</Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export { ApplicationsEditView }

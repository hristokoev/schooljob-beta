import { getTranslations } from 'next-intl/server'
import { Job } from '@payload-types'
import Link from 'next/link'
import React from 'react'

import { type Column, Duplicate, Message, Pill, Table } from '@/components'
import { cz } from '@/payload/data'
import { renderSalary } from '@/utilities'

interface JobsTableViewProps {
  docs: Job[]
}

const JobsTableView: React.FC<JobsTableViewProps> = async ({ docs }) => {
  const t = await getTranslations()

  const columns: Column[] = [
    {
      key: 'title',
      label: t('editJob.title'),
      render: (item: Job) => (
        <div className="text-left font-medium text-sky-500">
          <Link href={`/account/jobs/${item.id}`} className="underline hover:no-underline">
            <span>{item.title}</span>
          </Link>
        </div>
      ),
    },
    {
      key: 'location',
      label: t('editJob.location'),
      render: (item: Job) => (
        <div className="text-left font-medium text-sky-500">
          {item.location && item.location.length > 0
            ? item.location.map(location => cz.find(l => l.value === location)?.label).join(', ')
            : '-'}
        </div>
      ),
    },
    {
      key: 'salary',
      label: t('editJob.salaryOn'),
      render: (item: Job) => {
        const salary = item.salary

        if (!salary || !salary?.enabled) {
          return '-'
        }

        return <div className="text-left font-medium text-emerald-500">{renderSalary(salary)}</div>
      },
    },
    {
      key: 'employmentType',
      label: t('editJob.employment'),
      render: item => (
        <div className="flex gap-2 text-left font-medium text-sky-500">
          {item.employmentType.map((type: Job['employmentType'], index: string) => (
            <Pill key={index} size="lg" color="blue">
              {t(`search.options.${type}` as 'search.employmentType')}
            </Pill>
          ))}
        </div>
      ),
    },
    {
      key: 'applications',
      label: t('editJob.applications'),
      render: item => {
        const applicationCount = item.applications?.length || 0
        const hasApplications = applicationCount > 0

        return (
          <div className={`text-left font-medium ${hasApplications ? 'text-sky-500' : ''}`}>
            {applicationCount === 0 ? (
              t('ui.applications', { count: applicationCount })
            ) : (
              <>
                <Link href="/account/applications" className="underline hover:no-underline">
                  {t('ui.applications', { count: applicationCount })}
                </Link>
              </>
            )}
          </div>
        )
      },
    },
    {
      key: 'status',
      label: t('editJob.status'),
      render: (item: Job) => (
        <Message
          success={item.status === 'published'}
          warning={item.status === 'unpublished'}
          message={t(`search.options.${item.status}` as 'search.status')}
          className="w-full"
        />
      ),
    },
    {
      key: 'actions',
      label: t('editJob.actions'),
      render: (item: Job) => <Duplicate id={item.id} />,
    },
  ]

  return <Table columns={columns} data={docs} title={t('ui.jobs', { count: docs.length })} />
}

export { JobsTableView }

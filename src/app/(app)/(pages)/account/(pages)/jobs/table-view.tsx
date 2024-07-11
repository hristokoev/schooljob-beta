import React, { useState } from 'react'
import Link from 'next/link'

import { type Column, Message, Pill, Table } from '@/components'
import { renderSalary, convertValue } from '@/utilities'
import { Job } from '@payload-types'

interface JobsTableViewProps {
  docs: Job[]
}

const JobsTableView: React.FC<JobsTableViewProps> = ({ docs }) => {
  const columns: Column[] = [
    {
      key: 'title',
      label: 'Title',
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
      label: 'Location',
      render: (item: Job) => (
        <div className="text-left font-medium text-sky-500">
          {item.location ? item.location : '-'}
        </div>
      ),
    },
    {
      key: 'salary',
      label: 'Salary',
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
      label: 'Employment Type',
      render: item => (
        <div className="flex gap-2 text-left font-medium text-sky-500">
          {item.employmentType.map((type: Job['employmentType'], index: string) => (
            <Pill key={index} size="lg" color="blue">
              {convertValue(type.toString())}
            </Pill>
          ))}
        </div>
      ),
    },
    {
      key: 'applications',
      label: 'Applications',
      render: item => {
        const applicationCount = item.applications?.length || 0
        const hasApplications = applicationCount > 0

        return (
          <div className={`text-left font-medium ${hasApplications ? 'text-sky-500' : ''}`}>
            {applicationCount === 0 ? (
              '0 Applications'
            ) : (
              <>
                <Link href="/admin/applications" className="underline hover:no-underline">
                  {applicationCount} {applicationCount === 1 ? 'Application' : 'Applications'}
                </Link>
              </>
            )}
          </div>
        )
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: Job) => (
        <Message
          success={item.status === 'published'}
          warning={item.status === 'unpublished'}
          message={convertValue(item.status)}
          className="w-full"
        />
      ),
    },
  ]

  return <Table columns={columns} data={docs} title={`Jobs (${docs.length})`} />
}

export { JobsTableView }

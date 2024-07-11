import React, { Fragment } from 'react'

import { type Column, Table, Message } from '@/components'
import { Application, Job } from '@payload-types'
import Link from 'next/link'
import { convertValue, formatDate } from '@/utilities'

interface ApplicationsTableViewProps {
  docs: Application[]
}

const candidateFullName = (item: Application) => {
  if (!item.candidate) {
    return `${item.firstName} ${item.lastName}`
  }
  return typeof item.candidate === 'string'
    ? item.candidate
    : `${item.candidate.firstName} ${item.candidate.lastName}`
}

const ApplicationsTableView: React.FC<ApplicationsTableViewProps> = ({ docs }) => {
  const columns: Column[] = [
    {
      key: 'candidate',
      label: 'Candidate',
      render: (item: Application) => (
        <div className="text-left font-medium text-sky-500">
          <Link
            href={`/account/applications/${item.trackingId}`}
            className="underline hover:no-underline"
          >
            <span>{candidateFullName(item)}</span>
          </Link>
        </div>
      ),
    },
    { key: 'job', label: 'Job', render: (item: Application) => (item.job as Job).title },
    {
      key: 'updatedAt',
      label: 'Last Updated',
      render: (item: Application) => formatDate(item.updatedAt),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: Application) => (
        <Message
          error={item.status === 'rejected'}
          success={item.status === 'accepted'}
          warning={item.status === 'pending'}
          message={convertValue(item.status)}
          className="w-full"
        />
      ),
    },
  ]

  return (
    <Fragment>
      <Table columns={columns} data={docs} title={`Applications (${docs.length})`} />
    </Fragment>
  )
}

export { ApplicationsTableView }

import React from 'react'

import { TableItem } from './TableItem'

interface Column {
  key: string
  label: string
  render?: (item: any) => React.ReactNode
  emptyState?: {
    title: string
    description: string
  }
}

const Table = ({ columns, data, title }: { columns: Column[]; data: any[]; title: string }) => {
  return (
    <div className="relative rounded-md border border-slate-300 bg-white shadow-sm">
      <header className="border-b border-slate-100 px-5 py-4">
        <h2 className="font-semibold text-slate-800">{title}</h2>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="border-b border-t border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
            <tr>
              {columns.map(column => (
                <th key={column.key} className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                  <div className="text-left font-semibold">{column.label}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {data.map(item => (
              <TableItem key={item.id} item={item} columns={columns} />
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-4 text-center text-slate-500">
                  No items to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { type Column, Table }

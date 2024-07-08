import { type Column } from '..'

interface TableItemProps {
  item: any
  columns: Column[]
}

export const TableItem = ({ item, columns }: TableItemProps) => {
  return (
    <tr>
      {columns.map((column) => (
        <td key={column.key} className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          {column.render ? (
            column.render(item)
          ) : (
            <div className="text-left">{item[column.key]}</div>
          )}
        </td>
      ))}
    </tr>
  )
}

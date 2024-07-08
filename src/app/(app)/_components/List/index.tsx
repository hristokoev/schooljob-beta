import React from 'react'

import { Checkmark } from '@/components'

interface ListProps {
  label?: string
  items: string[]
}

const List: React.FC<ListProps> = ({ label, items }) => {
  return (
    <div>
      {label && <h2 className="mb-2 text-xl font-bold leading-snug text-slate-800">{label}</h2>}
      <ul className="-mx-2 -my-1 flex flex-col text-lg text-slate-800">
        {items.map((item, index) => (
          <li key={index} className="mx-2 my-1 flex items-center">
            <Checkmark />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { List }

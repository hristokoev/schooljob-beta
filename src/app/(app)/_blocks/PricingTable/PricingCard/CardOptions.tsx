import { Membership } from '@payload-types'
import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'

interface Props {
  membership: Membership
  selected: string | null
  setSelected: (id: string | null) => void
}

const CardOptions: React.FC<Props> = ({ membership, selected, setSelected }) => {
  const { featured, discounts } = membership

  const handleSelect = (id: string) => {
    if (selected === id) {
      setSelected(null)

      return
    }

    setSelected(id)
  }

  if (!discounts) return null

  return (
    <ul className="mb-4 space-y-2 sm:flex sm:space-x-2 sm:space-y-0 lg:flex-col lg:space-x-0 lg:space-y-2">
      {discounts.map(item => (
        <li key={item.id} className="relative">
          <button
            onClick={() => handleSelect(item.id!)}
            className={`h-full w-full rounded border px-4 py-3 text-left shadow-sm duration-150 ease-in-out ${
              selected === item.id
                ? 'border-royal-blue-500 bg-royal-blue-500/5 hover:border-royal-blue-400'
                : featured
                  ? 'border-slate-700 hover:border-slate-600'
                  : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            {selected === item.id && (
              <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-royal-blue-500 p-0.5 transition-all duration-150 ease-in-out hover:bg-royal-blue-600">
                <XMarkIcon className="h-4 w-4 fill-current p-0.5 text-white" />
              </div>
            )}
            <div className="mb-0.5 flex flex-wrap items-center justify-between">
              <span className={`font-semibold ${featured ? 'text-slate-100' : 'text-slate-800'}`}>
                {item.text}
              </span>
              <span className={`font-medium ${featured ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {item.discount}%
              </span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}

export { CardOptions }

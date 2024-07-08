import React from 'react'

import { Label, Pill } from '@/components'

interface PillsWithLabelProps {
  label?: string
  items: string[]
}

const PillsWithLabel: React.FC<PillsWithLabelProps> = ({ label, items }) => {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <Pill key={index} size="lg">
            {item}
          </Pill>
        ))}
      </div>
    </div>
  )
}

export { PillsWithLabel }

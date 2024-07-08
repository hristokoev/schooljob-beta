import React from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components'

interface BreadcrumbBlockProps {
  links: { text: string; href?: string }[]
  current: string
}

const BreadcrumbBlock: React.FC<BreadcrumbBlockProps> = ({ links, current }) => {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList className="p-0 m-0">
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {link.href === undefined ? (
                <BreadcrumbPage>{link.text}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={link.href}>{link.text}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { BreadcrumbBlock }

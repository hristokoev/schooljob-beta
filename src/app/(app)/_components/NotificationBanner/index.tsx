import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid'
import React, { ReactElement } from 'react'

interface NotificationProps {
  children: React.ReactNode
  className?: string
  type?: 'warning' | 'error' | 'success' | ''
}

const NotificationBanner: React.FC<NotificationProps> = ({
  children,
  className = '',
  type = '',
}) => {
  const typeIcon = (type: string): ReactElement => {
    switch (type) {
      case 'warning':
        return (
          <ExclamationTriangleIcon className="mr-3 mt-[3px] h-4 w-4 shrink-0 fill-current text-yellow-500" />
        )
      case 'error':
        return <XCircleIcon className="mr-3 mt-[3px] h-4 w-4 shrink-0 fill-current text-red-500" />
      case 'success':
        return (
          <CheckCircleIcon className="mr-3 mt-[3px] h-4 w-4 shrink-0 fill-current text-green-500" />
        )
      default:
        return (
          <InformationCircleIcon className="mr-3 mt-[3px] h-4 w-4 shrink-0 fill-current text-blue-500" />
        )
    }
  }

  return (
    <>
      <div className={className} role="alert">
        <div className="inline-flex w-full flex-col rounded-md border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600 shadow-lg">
          <div className="flex w-full items-start justify-between">
            <div className="flex">
              {typeIcon(type)}
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export { NotificationBanner }

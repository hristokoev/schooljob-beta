import { XMarkIcon, CheckIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import React, { Fragment } from 'react'

export const Message: React.FC<{
  message?: React.ReactNode
  error?: React.ReactNode
  success?: React.ReactNode
  warning?: React.ReactNode
  className?: string
}> = ({ message, error, success, warning, className }) => {
  const messageToRender = message || error || success || warning
  const colors = {
    error: 'bg-red-100 text-red-600 border-red-300',
    success: 'bg-green-100 text-green-600 border-green-300',
    warning: 'bg-amber-100 text-amber-600 border-amber-300',
  }

  if (messageToRender) {
    return (
      <Fragment>
        <div className={[className].filter(Boolean).join(' ')}>
          <div
            className={`flex items-center rounded border p-3 font-medium ${
              colors[error ? 'error' : success ? 'success' : warning ? 'warning' : 'success']
            }`}
          >
            {error && <XMarkIcon className="mr-2 h-5 w-5" />}
            {success && <CheckIcon className="mr-2 h-5 w-5" />}
            {warning && <InformationCircleIcon className="mr-2 h-5 w-5" />}
            <span className="text-sm">{messageToRender}</span>
          </div>
        </div>
      </Fragment>
    )
  }
}

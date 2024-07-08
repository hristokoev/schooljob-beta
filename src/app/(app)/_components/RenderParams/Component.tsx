'use client'

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { Message } from '@/components'

type RenderParamsComponentProps = {
  params?: string[]
  message?: string
  className?: string
  onParams?: (paramValues: ((string | null | undefined) | string[])[]) => void
}

const RenderParamsComponent: React.FC<RenderParamsComponentProps> = ({
  params = ['error', 'warning', 'success', 'message'],
  className,
  onParams,
}) => {
  const searchParams = useSearchParams()
  const paramValues = params.map((param) => searchParams?.get(param))

  useEffect(() => {
    if (paramValues.length && onParams) {
      onParams(paramValues)
    }
  }, [paramValues, onParams])

  if (paramValues.length) {
    return (
      <div className={className}>
        {paramValues.map((paramValue, index) => {
          if (!paramValue) return null

          return (
            <Message
              className=""
              key={paramValue}
              {...{
                [params[index]]: paramValue,
              }}
            />
          )
        })}
      </div>
    )
  }

  return null
}

export { RenderParamsComponent, type RenderParamsComponentProps }

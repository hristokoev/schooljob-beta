'use client'

import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import React, { Fragment, useState } from 'react'
import { useTranslations } from 'next-intl'
import { XCircleIcon } from '@heroicons/react/24/solid'

import { Button, Input } from '@/components'

interface InputListProps {
  field: ControllerRenderProps<any, any>
  setValue: UseFormReturn<any>['setValue']
  disabled?: boolean
}

const InputList: React.FC<InputListProps> = ({ field, setValue, disabled }) => {
  const t = useTranslations()
  const [currentValue, setCurrentValue] = useState<string>('')

  return (
    <Fragment>
      <div className="flex gap-5">
        <Input
          className="w-full"
          value={currentValue}
          onChange={e => setCurrentValue(e.target.value)}
          disabled={disabled}
        />
        <Button
          className="h-auto w-32"
          variant="outline"
          type="button"
          disabled={currentValue.trim() === '' || disabled}
          onClick={() => {
            if (!field.value?.includes(currentValue)) {
              setValue(field.name, [...(field.value || ''), currentValue])
            }

            setCurrentValue('')
          }}
        >
          <svg className="h-4 w-4 shrink-0 fill-current opacity-50" viewBox="0 0 16 16">
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span className="ml-2">{t('ui.add')}</span>
        </Button>
      </div>
      {field.value && field.value?.length > 0 && (
        <ul className="mt-4 flex gap-2">
          {field.value?.map((item: string, index: number) => (
            <li key={index}>
              <p
                aria-disabled={disabled}
                className={`inline-flex cursor-pointer items-center rounded-sm border border-royal-blue-600 bg-royal-blue-100 px-3 py-1 text-center text-sm font-medium text-royal-blue-600 hover:bg-royal-blue-200 aria-[disabled=true]:pointer-events-none aria-[disabled=true]:cursor-not-allowed aria-[disabled=true]:opacity-50`}
                onClick={() =>
                  setValue(
                    field.name,
                    field.value?.filter((value: string) => value !== item),
                  )
                }
              >
                {item}
                <XCircleIcon className="ml-2 h-4 w-4" />
              </p>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  )
}

export { InputList }

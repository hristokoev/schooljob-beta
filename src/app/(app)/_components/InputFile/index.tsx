import React, { Fragment } from 'react'
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import { FieldError } from 'react-hook-form'
import { useTranslations } from 'next-intl'

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  file?: File
  error?: FieldError
}

const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  ({ id, file, error, ...props }, ref) => {
    const t = useTranslations()

    return (
      <Fragment>
        <label htmlFor={id} className="cursor-pointer">
          <div className="rounded-md border border-slate-300 bg-white transition duration-100 ease-in-out hover:border-slate-300 hover:bg-slate-50">
            <div className="flex h-full gap-5 p-5">
              <div className="flex size-12 flex-none items-center justify-center rounded bg-royal-blue-500 text-white md:size-16">
                <ArrowUpTrayIcon className="h-8 w-8" />
              </div>
              <div className="flex grow flex-col justify-center overflow-x-hidden">
                <p className="inline font-semibold leading-snug">
                  <input
                    type="file"
                    accept=".pdf"
                    id={id}
                    ref={ref}
                    {...props}
                    className="w-full cursor-pointer text-sm text-slate-500 file:hidden"
                  />
                </p>
                {!file && <span className="text-slate-400">{t('ui.upload')}</span>}
              </div>
            </div>
          </div>
        </label>
        <span className="text-sm text-red-500">{error?.message}</span>
      </Fragment>
    )
  },
)

InputFile.displayName = 'InputFile'

export { InputFile }

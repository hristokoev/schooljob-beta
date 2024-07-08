import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import React, { Fragment } from 'react'

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  file?: File
}

const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  ({ id, file, ...props }, ref) => {
    return (
      <Fragment>
        <input type="file" accept=".pdf" className="hidden" id={id} ref={ref} {...props} />
        <label htmlFor={id} className="cursor-pointer">
          <div className="rounded-md border border-slate-300 bg-white transition duration-100 ease-in-out hover:border-slate-300 hover:bg-slate-50">
            <div className="flex h-full gap-5 p-5">
              <div className="flex size-12 flex-none items-center justify-center rounded bg-royal-blue-500 text-white md:size-16">
                <ArrowUpTrayIcon className="h-8 w-8" />
              </div>
              <div className="flex grow flex-col justify-center overflow-x-hidden">
                <p className="inline font-semibold leading-snug">
                  {file ? file.name.replace(/C:\\fakepath\\/i, '') : 'Upload your CV'}
                </p>
                <p>Click to upload your CV</p>
              </div>
            </div>
          </div>
        </label>
      </Fragment>
    )
  },
)

InputFile.displayName = 'InputFile'

export { InputFile }

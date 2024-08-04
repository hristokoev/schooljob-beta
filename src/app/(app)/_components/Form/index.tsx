import React, { Fragment } from 'react'

import { FormFieldProps, GenericFormData } from '@/types'
import { cn } from '@/utilities/cn'
import { Input } from '@/components'

const FormInputField = <T extends GenericFormData>({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  className,
  disabled,
}: FormFieldProps<T>) => (
  <Fragment>
    <Input
      type={type}
      placeholder={placeholder}
      className={cn(
        `w-full ${error && 'border-red-300 bg-red-300/10 hover:border-red-400 focus:border-red-500 focus:shadow-red-700/25'}`,
        className,
      )}
      disabled={disabled}
      {...register(name, { valueAsNumber })}
    />
    <span className="text-sm text-red-500">{error?.message}</span>
  </Fragment>
)

export { FormInputField }

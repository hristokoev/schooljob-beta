'use client'

import React, { ComponentType, Fragment } from 'react'

export const Provider: ComponentType<{ children?: React.ReactNode }> = ({ children }) => {
  return <Fragment>{children}</Fragment>
}

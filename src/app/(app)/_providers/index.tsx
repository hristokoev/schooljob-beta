'use client'

import React from 'react'

import { AuthProvider } from './Auth'

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>
}

export { Providers }
export { useAuth, AuthProvider } from './Auth'

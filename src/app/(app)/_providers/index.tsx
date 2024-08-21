'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

import { AuthProvider } from './Auth'

const queryClient = new QueryClient()

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}

export { Providers }
export { useAuth, AuthProvider } from './Auth'

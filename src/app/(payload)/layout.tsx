/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import '@payloadcms/next/css'
import configPromise from '@payload-config'
import React from 'react'
import { RootLayout } from '@payloadcms/next/layouts'
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

import { importMap } from './admin/importMap.js'

import './custom.scss'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => (
  <RootLayout importMap={importMap} config={configPromise}>
    {children}
  </RootLayout>
)

export default Layout

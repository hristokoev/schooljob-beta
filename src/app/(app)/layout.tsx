import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import React from 'react'
import { Toaster } from 'sonner'

import './globals.css'

import { Footer, Header } from '@/components'
import { Providers } from '@/providers'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            <Toaster richColors position="top-center" />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

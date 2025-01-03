'use client'

import React, { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Button, Gutter, Hr, Input } from '@/components'
import Logo from '@/public/images/logo.svg'
import { useAuth } from '@/providers'

const Footer: React.FC = () => {
  const t = useTranslations()
  const { status, loading } = useAuth()

  return (
    <footer className="bg-gradient-to-t from-slate-950 to-slate-900">
      <Gutter>
        <div className="grid gap-8 py-8 sm:grid-cols-12 md:py-12">
          <div className="flex flex-col max-sm:order-1 sm:col-span-6 lg:col-span-3">
            <Link href="/">
              <Image src={Logo.src} alt="Schooljob" width={110} height={26} />
            </Link>
            <div>
              <div className="mb-1 mt-4 flex flex-col text-sm text-zinc-200">
                <span>Schooljob s.r.o.</span>
                <span>Na Folimance 2155/15</span>
                <span>120 00 Praha 2</span>
                <span>IČO: 17791481</span>
              </div>
              <ul className="mb-1 mt-4 flex gap-4">
                <li>
                  <a
                    className="flex items-center justify-center text-zinc-100 transition hover:text-zinc-300"
                    href="#0"
                    aria-label="Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center justify-center text-zinc-100 transition hover:text-zinc-300"
                    href="#0"
                    aria-label="LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center justify-center text-zinc-100 transition hover:text-zinc-300"
                    href="#0"
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="sm:col-span-6 lg:col-span-2">
            <h6 className="mb-2 text-sm font-extrabold text-white">{t('footer.links')}</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-zinc-100 transition hover:text-zinc-300" href="/solutions">
                  {t('footer.forOrganizations')}
                </a>
              </li>
              <li>
                <a className="text-zinc-100 transition hover:text-zinc-300" href="/pricing">
                  {t('footer.pricing')}
                </a>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-6 lg:col-span-3">
            <h6 className="mb-2 text-sm font-extrabold text-white">{t('footer.contact')}</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="text-zinc-100 transition hover:text-zinc-300"
                  href="mailto:info@schooljob.cz"
                >
                  info@schooljob.cz
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-100 transition hover:text-zinc-300"
                  href="tel:+420778888927"
                >
                  +420 778 888 927
                </a>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-6 lg:col-span-4">
            <h6 className="mb-2 text-sm font-extrabold text-white">
              {t('footer.newsletter.title')}
            </h6>
            <p className="mb-4 text-sm text-zinc-100">{t('footer.newsletter.description')}</p>
            <div className="flex w-full flex-wrap gap-2 py-0 pl-0 sm:items-center">
              <Input id="name" type="text" placeholder={t('footer.newsletter.placeholder')} />
              <Button variant="default" size="sm">
                {t('footer.newsletter.button')}
              </Button>
            </div>
          </div>
        </div>
        <Hr className="border-slate-700" />
        <div className="flex justify-between py-6">
          <div className="flex items-center gap-5 text-white">
            <p className="text-xl font-bold">Schooljob</p>
          </div>
          {loading ? (
            <div className="h-8 w-32 animate-pulse bg-neutral-500" />
          ) : (
            <div className="flex items-center gap-2">
              {status === 'loggedIn' ? (
                <Fragment>
                  <Link href="/logout">
                    <Button variant="secondary" size="sm">
                      {t('authentication.logout')}
                    </Button>
                  </Link>
                </Fragment>
              ) : (
                <Fragment>
                  <Link href="/login">
                    <Button variant="tertiary" size="sm">
                      {t('authentication.login')}
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" variant="secondary">
                      {t('authentication.signup')}
                    </Button>
                  </Link>
                </Fragment>
              )}
            </div>
          )}
        </div>
        <ul className="flex space-x-12 pb-6 text-sm">
          <li>
            <a
              className="text-zinc-100 transition hover:text-zinc-300"
              href="/documents/terms-of-service"
            >
              {t('footer.bottomLinks.terms')}
            </a>
          </li>
        </ul>
      </Gutter>
    </footer>
  )
}

export { Footer }

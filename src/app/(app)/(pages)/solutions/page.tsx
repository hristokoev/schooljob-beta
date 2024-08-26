import React, { Fragment } from 'react'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

import { Gutter, UnderlinedText, VerticalPadding } from '@/components'
import { getMeUser } from '@/utilities/getMeUser'
import RegisterForm from './RegisterForm'

export default async function Register() {
  const t = await getTranslations()
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent(t('authentication.errors.alreadyLoggedIn'))}`,
  })

  return (
    <Fragment>
      <VerticalPadding bottom="lg">
        <Gutter>
          <div className="py-0 md:pb-20 md:pt-40">
            <div className="lg:flex lg:space-x-12 xl:space-x-16">
              {/* Left side */}
              <div className="mb-16 grow text-center lg:mb-0 lg:mt-16 lg:text-left">
                <div className="relative mx-auto mb-16 flex-col text-center md:flex-row md:text-left">
                  <h1 className="leading-2 whitespace-pre-wrap text-4xl font-extrabold tracking-tighter">
                    {t.rich('solutions.h1', {
                      UnderlinedText: chunks => <UnderlinedText>{chunks}</UnderlinedText>,
                    })}
                  </h1>
                </div>

                <div className="mb-12">
                  <ul className="inline-flex flex-col space-y-2.5 text-slate-500">
                    <li className="flex items-center text-left">
                      <svg
                        className="mr-3 shrink-0"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle className="fill-blue-100" cx="10" cy="10" r="10" />
                        <path
                          className="fill-blue-500"
                          d="M15.335 7.933 14.87 7c-4.025 1.167-6.067 3.733-6.067 3.733l-1.867-1.4-.933.934L8.802 14c2.158-4.025 6.533-6.067 6.533-6.067Z"
                        />
                      </svg>
                      <span>{t('solutions.bullet1')}</span>
                    </li>
                    <li className="flex items-center text-left">
                      <svg
                        className="mr-3 shrink-0"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle className="fill-blue-100" cx="10" cy="10" r="10" />
                        <path
                          className="fill-blue-500"
                          d="M15.335 7.933 14.87 7c-4.025 1.167-6.067 3.733-6.067 3.733l-1.867-1.4-.933.934L8.802 14c2.158-4.025 6.533-6.067 6.533-6.067Z"
                        />
                      </svg>
                      <span>{t('solutions.bullet2')}</span>
                    </li>
                    <li className="flex items-center text-left">
                      <svg
                        className="mr-3 shrink-0"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle className="fill-blue-100" cx="10" cy="10" r="10" />
                        <path
                          className="fill-blue-500"
                          d="M15.335 7.933 14.87 7c-4.025 1.167-6.067 3.733-6.067 3.733l-1.867-1.4-.933.934L8.802 14c2.158-4.025 6.533-6.067 6.533-6.067Z"
                        />
                      </svg>
                      <span>{t('solutions.bullet3')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right side */}
              <div className="relative shrink-0 text-center lg:text-left">
                <div className="flex pt-12 lg:pl-12 lg:pt-0 xl:pl-20">
                  <div className="z-10 mx-auto w-full max-w-[480px] rounded-md border border-royal-blue-300 bg-white p-8 shadow-2xl shadow-royal-blue-300 lg:mx-0 lg:w-[480px] lg:max-w-none xl:w-[512px]">
                    <RegisterForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Gutter>
      </VerticalPadding>
    </Fragment>
  )
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.solutions' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

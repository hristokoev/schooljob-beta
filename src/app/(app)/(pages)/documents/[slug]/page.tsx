import React, { Fragment } from 'react'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { Article, Gutter, Main, MinHeight, RichText, Section, VerticalPadding } from '@/components'
import { BreadcrumbBlock } from '@/blocks'

interface Props {
  params: {
    slug: string
  }
}

export default async function Page({ params }: Props) {
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'documents',
    limit: 1,
    where: {
      slug: {
        equals: params.slug,
      },
    },
    depth: 0,
  })

  const agreement = data.docs[0]

  if (!agreement) {
    notFound()
  }

  const { title, richText } = agreement

  const t = await getTranslations()
  const links = [
    {
      text: t('home'),
      href: '/',
    },
  ]

  return (
    <MinHeight className="bg-slate-100">
      <VerticalPadding>
        <Gutter>
          <BreadcrumbBlock links={links} current={t('ui.document')} />
          <Main>
            <Article>
              <Section>
                <div className="rounded-md bg-white px-4 py-8 shadow sm:px-6 lg:px-8">
                  <header className="mb-4">
                    <h1 className="inline-flex items-center text-2xl font-bold text-slate-800 md:text-3xl">
                      {title}
                    </h1>
                  </header>

                  {richText && (
                    <Fragment>
                      <RichText content={richText} />
                    </Fragment>
                  )}
                </div>
              </Section>
            </Article>
          </Main>
        </Gutter>
      </VerticalPadding>
    </MinHeight>
  )
}

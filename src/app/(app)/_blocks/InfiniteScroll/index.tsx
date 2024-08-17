import React, { Fragment } from 'react'
import configPromise from '@payload-config'
import { getCachedPayload } from '@cached-local-api'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'
import { type Partner } from '@payload-types'

import { InfiniteScrollLogo } from '@/components'

const InfiniteScroll: React.FC = async () => {
  const t = await getTranslations()
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const cachedPayload = getCachedPayload(payload)

  const partners = await cachedPayload.find({
    collection: 'partners',
    depth: 1,
  })

  const renderLogo = (partner: Partner, index: number) => {
    if (typeof partner.logo !== 'string') {
      return <InfiniteScrollLogo key={index} {...partner.logo} />
    }

    return null
  }

  return (
    <div className="overflow-hidden">
      <div className="pb-24 text-center">
        <h2 className="mb-4 font-medium text-slate-800">{t('ourPartners')}</h2>
      </div>
      <div className="group mx-auto space-y-6">
        <div className="inline-flex w-full flex-nowrap">
          {partners.docs.length < 5 ? (
            <div className="flex w-full items-center justify-center">
              {partners.docs.map((partner, index) => renderLogo(partner as Partner, index))}
            </div>
          ) : (
            <Fragment>
              <div className="flex animate-infinite-scroll items-center justify-center group-hover:[animation-play-state:paused] md:justify-start">
                {partners.docs.map((partner, index) => renderLogo(partner as Partner, index))}
              </div>
              <div
                className="flex animate-infinite-scroll items-center justify-center group-hover:[animation-play-state:paused] md:justify-start"
                aria-hidden="true"
              >
                {partners.docs.map((partner, index) => renderLogo(partner as Partner, index))}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

export { InfiniteScroll }

'use server'

import configPromise from '@payload-config'
import { EmailTemplate } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { render } from '@react-email/render'

import { replaceEmailVariables, type ReplacementVariables } from '@/payload/utilities'
import { Email } from '@/payload/templates'

export const sendEmail = async ({
  template,
  email,
  variables,
}: {
  template: EmailTemplate
  email: string
  variables: ReplacementVariables
}) => {
  const t = await getTranslations()
  const { title, from, blocks, preview, footer } = template

  const html = render(<Email blocks={blocks} previewText={preview} footerText={footer} />, {
    pretty: true,
  })

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  try {
    const doc = await payload.sendEmail({
      from: `${from}@${process.env.RESEND_FROM_EMAIL}`, // from@domain.com
      to: email,
      subject: replaceEmailVariables(title, variables),
      html: html,
    })

    if (!doc) {
      throw new Error(t('email.error'))
    }

    return doc
  } catch (error) {
    console.error(error)
    throw new Error(t('email.error'))
  }
}

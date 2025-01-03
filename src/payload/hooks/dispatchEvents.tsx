import type { CollectionAfterChangeHook } from 'payload'
import { EmailTemplate } from '@payload-types'
import React from 'react'
import { render } from '@react-email/render'

import { replaceEmailVariables, type ReplacementVariables } from '@/payload/utilities'
import { compareTwoObjects } from '@/payload/utilities'
import { Email } from '@/payload/templates'

type EventOperationBase = {
  event: EmailTemplate['event']
  operation: 'create' | 'update' | 'delete'
}

type EventOperation =
  | ({ operation: 'update'; field: string } & EventOperationBase)
  | ({ operation: 'create' | 'delete' } & EventOperationBase)

export const dispatchEvents: (eventOperations: EventOperation[]) => CollectionAfterChangeHook =
  eventOperations =>
  async ({ doc, previousDoc, collection, operation, req: { payload } }) => {
    eventOperations.forEach(async eventOperation => {
      const emailTemplates = await payload.find({
        collection: 'email-templates',
        where: {
          event: {
            equals: eventOperation.event,
          },
        },
      })

      if (!emailTemplates.docs.length) {
        return
      }

      emailTemplates.docs.forEach(async template => {
        // Only send the email if the operation matches
        if (eventOperation.operation === operation) {
          // Check whether the field that is being updated is included in the fields in the template.
          const docChanged = compareTwoObjects(doc, previousDoc)

          if (eventOperation.operation === 'update' && !docChanged.includes(eventOperation.field)) {
            return
          }

          let emailTo = ''

          // Determine the recipient based on the template's "to" property.
          switch (template.to) {
            case 'admin':
              if (!process.env.ADMIN_EMAIL) {
                throw new Error('ADMIN_EMAIL environment variable is not set')
              }

              emailTo = process.env.ADMIN_EMAIL
              break

            // If sending to candidates, use the document's email. This case is used for candidates and applications.
            case 'candidate':
              emailTo = doc.email
              break

            // If sending to organizations, use the document's email. This case is used only in the 'organizations' collection.
            case 'organization':
              // Depending on the collection, determine where to get the organization's email from.
              if (collection.slug === 'organizations' || collection.slug === 'jobs') {
                emailTo = doc.email
              } else if (collection.slug === 'applications') {
                emailTo = doc.job.email
              }

              break

            default:
              throw new Error('Unknown recipient type in email template')
          }

          if (!emailTo) {
            throw new Error('No email address found')
          }

          const blocks = template.blocks
          const previewText = template.preview
          const footerText = template.footer

          const html = render(
            <Email blocks={blocks} previewText={previewText} footerText={footerText} />,
            {
              pretty: true,
            },
          )

          const variables: ReplacementVariables = {
            ...(collection.slug === 'applications' && {
              candidateFullName: doc.firstName + ' ' + doc.lastName,
              jobTitle: doc.job.title,
            }),
            ...(collection.slug === 'candidates' && {
              candidateFullName: doc.firstName + ' ' + doc.lastName,
              candidateEmail: doc.email,
            }),
            ...(collection.slug === 'organizations' && {
              organizationTitle: doc.title,
              organizationEmail: doc.email,
            }),
            ...(collection.slug === 'jobs' && {
              jobTitle: doc.title,
              jobStatus: doc.status,
              organizationTitle: doc.organization.title,
            }),
          }

          // Send email
          await payload.sendEmail({
            from: `${template.from}@${process.env.RESEND_FROM_EMAIL}`,
            to: emailTo,
            subject: replaceEmailVariables(template.title, variables),
            html: replaceEmailVariables(html, variables),
          })
        }
      })
    })

    return
  }

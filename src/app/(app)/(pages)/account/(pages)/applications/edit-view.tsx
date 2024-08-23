'use client'

import { Application, EmailTemplate, TextBlock } from '@payload-types'
import React, { useCallback, useEffect, useState } from 'react'
import { EditorState } from 'lexical'
import Link from 'next/link'
import { PaginatedDocs } from 'payload'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Step01, Step02 } from './ApplicationForm'
import { Button } from '@/components'
import { sendEmail } from '@/actions'
import { updateApplication } from '@/actions'

const ApplicationsEditView: React.FC<Application> = application => {
  const t = useTranslations()
  const { id, status: originalStatus, email, job } = application
  const [currentStep, setCurrentStep] = useState(1)
  const [newStatus, setNewStatus] = useState<Application['status']>(originalStatus)
  const [isStatusChanged, setIsStatusChanged] = useState(false)
  const [emailData, setEmailData] = useState<EmailTemplate | null | undefined>(undefined)
  const router = useRouter()

  const { data: emailTemplateData } = useQuery({
    queryKey: ['emailTemplate', newStatus],
    queryFn: async () => {
      if (newStatus !== 'pending') {
        const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/email-templates`
        const params = new URLSearchParams()
        params.append('where[event][equals]', `application-status-${newStatus}`)
        const fullUrl = `${baseUrl}?${params.toString()}`

        const response = await fetch(fullUrl)
        const data: PaginatedDocs<EmailTemplate> = await response.json()

        if (data && data.docs && data.docs.length > 0) {
          return data.docs[0]
        }
      }

      return null
    },
  })

  useEffect(() => {
    setIsStatusChanged(newStatus !== originalStatus)
  }, [newStatus, originalStatus])

  const handleEmailContentChange = (editorState: EditorState) => {
    const serializedContent = editorState.toJSON()

    setEmailData(prev => {
      if (!prev) return prev

      const textBlock: TextBlock = {
        text: {
          root: {
            type: 'root',
            children: serializedContent.root.children,
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        blockType: 'Text',
      }

      return {
        ...prev,
        blocks: [textBlock],
      }
    })
  }

  const nextStep = () => {
    if (newStatus !== 'pending') {
      setCurrentStep(prev => Math.min(prev + 1, 2))
      setEmailData(emailTemplateData)
    }
  }

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const saveApplication = useCallback(() => {
    toast.promise(
      async () => {
        await updateApplication(id, newStatus)

        if (emailData && newStatus !== 'pending') {
          await sendEmail({
            email: email,
            template: emailData,
            variables: {
              jobTitle: typeof job === 'object' ? job.title : '',
            },
          })
        }
      },
      {
        loading: t('email.loading'),
        success: () =>
          newStatus === 'pending' ? t('editApplication.successUpdate') : t('email.success'),
        error: () =>
          newStatus === 'pending' ? t('editApplication.errorUpdate') : t('email.error'),
        finally() {
          router.push('/account/applications')
        },
      },
    )
  }, [newStatus, emailData])

  const renderActionButton = () => {
    if (newStatus === 'pending') {
      return (
        <Button
          onClick={saveApplication}
          disabled={!isStatusChanged}
          className={!isStatusChanged ? 'cursor-not-allowed opacity-50' : ''}
        >
          {t('ui.saveChanges')}
        </Button>
      )
    }

    if (currentStep < 2) {
      return (
        <Button
          onClick={nextStep}
          disabled={!isStatusChanged}
          className={!isStatusChanged ? 'cursor-not-allowed opacity-50' : ''}
        >
          {t('ui.next')}
        </Button>
      )
    }

    return (
      <Button className="bg-emerald-500 hover:bg-emerald-500/90" onClick={saveApplication}>
        {t('ui.sendEmail')}
      </Button>
    )
  }

  return (
    <div className="grow rounded-md border border-slate-300 bg-white">
      <div className="space-y-6 p-6">
        {currentStep === 1 && <Step01 {...application} setStatus={setNewStatus} />}
        {currentStep === 2 && (
          <Step02
            status={newStatus}
            emailTemplate={emailData}
            onEmailContentChange={handleEmailContentChange}
          />
        )}
      </div>
      <footer>
        <div className="flex flex-col border-t border-slate-200 px-6 py-5">
          <div className="flex justify-between">
            <div className="flex w-full justify-end gap-2">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={prevStep}>
                  {t('ui.goBack')}
                </Button>
              ) : (
                <Link href="/account/applications">
                  <Button variant="outline">{t('ui.goBack')}</Button>
                </Link>
              )}
              {renderActionButton()}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export { ApplicationsEditView }

'use client'

import React, { Fragment, useEffect, useState } from 'react'
import type { EmailTemplate } from '@payload-types'
import { useTranslations } from 'next-intl'

import { LexicalEditor } from '@/components'

interface Step02Props {
  status: string
  emailTemplate: EmailTemplate | null | undefined
  onEmailContentChange: (content: any) => void
}

const Step02: React.FC<Step02Props> = ({ status, emailTemplate, onEmailContentChange }) => {
  const t = useTranslations()
  const [editorContent, setEditorContent] = useState({})

  useEffect(() => {
    if (emailTemplate && emailTemplate.blocks[0].text) {
      const convertedContent = emailTemplate.blocks[0].text
      setEditorContent(convertedContent)
    }
  }, [emailTemplate])

  return (
    <Fragment>
      <section>
        <h3 className="mb-1 text-xl font-bold leading-snug text-slate-800">
          {t('ui.sendEmail')}: {t(`search.options.${status}` as 'search.status')}
        </h3>
        <li className="py-3 md:flex md:items-center md:justify-between">
          <div className="text-sm text-slate-800">{t('ui.sendEmailDescription')}</div>
        </li>
        {!emailTemplate ? (
          <div className="h-[200px] w-full animate-pulse border border-slate-300 bg-slate-100">
            <div className="h-[50px] w-full border-b border-slate-200 bg-white" />
          </div>
        ) : (
          <LexicalEditor onChange={onEmailContentChange} value={editorContent} />
        )}
      </section>
    </Fragment>
  )
}

export { Step02 }

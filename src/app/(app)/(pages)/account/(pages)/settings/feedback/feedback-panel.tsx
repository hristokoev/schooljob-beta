// TODO: Implement feedback

'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

const FeedbackPanel = () => {
  const t = useTranslations()

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="space-y-6 p-6">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-slate-800">{t('feedbackPanel.header')}</h2>
          <div className="text-sm">{t('feedbackPanel.description')}</div>
        </div>

        {/* Rate */}
        <section>
          <h3 className="mb-6 text-xl font-bold leading-snug text-slate-800">
            {t('feedbackPanel.rateHeader')}
          </h3>
          <div className="w-full max-w-xl">
            <div className="relative">
              <div
                className="absolute left-0 top-1/2 -mt-px h-0.5 w-full bg-slate-200"
                aria-hidden="true"
              ></div>
              <ul className="relative flex w-full justify-between">
                <li className="flex">
                  <button className="h-3 w-3 rounded-full border-2 border-slate-400 bg-white">
                    <span className="sr-only">{t('feedbackPanel.rate1')}</span>
                  </button>
                </li>
                <li className="flex">
                  <button className="h-3 w-3 rounded-full border-2 border-slate-400 bg-white">
                    <span className="sr-only">{t('feedbackPanel.rate2')}</span>
                  </button>
                </li>
                <li className="flex">
                  <button className="h-3 w-3 rounded-full border-2 border-indigo-500 bg-indigo-500">
                    <span className="sr-only">{t('feedbackPanel.rate3')}</span>
                  </button>
                </li>
                <li className="flex">
                  <button className="h-3 w-3 rounded-full border-2 border-slate-400 bg-white">
                    <span className="sr-only">{t('feedbackPanel.rate4')}</span>
                  </button>
                </li>
                <li className="flex">
                  <button className="h-3 w-3 rounded-full border-2 border-slate-400 bg-white">
                    <span className="sr-only">{t('feedbackPanel.rate5')}</span>
                  </button>
                </li>
              </ul>
            </div>
            <div className="mt-3 flex w-full justify-between text-sm italic text-slate-500">
              <div>{t('feedbackPanel.rateLeft')}</div>
              <div>{t('feedbackPanel.rateRight')}</div>
            </div>
          </div>
        </section>

        {/* Tell us in words */}
        <section>
          <h3 className="mb-5 text-xl font-bold leading-snug text-slate-800">
            {t('feedbackPanel.tellUs')}
          </h3>
          {/* Form */}
          <label className="sr-only" htmlFor="feedback">
            {t('feedbackPanel.leaveFeedback')}
          </label>
          <textarea
            id="feedback"
            className="form-textarea w-full focus:border-slate-300"
            rows={4}
            placeholder={t('feedbackPanel.leaveFeedbackPlaceholder')}
          ></textarea>
        </section>
      </div>
    </div>
  )
}

export { FeedbackPanel }

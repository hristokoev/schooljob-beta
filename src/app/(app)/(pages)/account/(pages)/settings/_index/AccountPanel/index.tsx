'use client'

import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, FormInputField, Input, Label } from '@/components'
import { ResetPasswordFormData, useResetPasswordFieldSchema } from '@/types'
import { updatePassword } from '@/actions'
import { useAuth } from '@/providers'

const AccountPanel: React.FC = () => {
  const t = useTranslations()
  const ResetPasswordFieldSchema = useResetPasswordFieldSchema()
  const { user } = useAuth()
  const [showSetNewPassword, setShowSetNewPassword] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordFieldSchema),
  })

  const onSubmit = useCallback(
    (data: ResetPasswordFormData) => {
      toast.promise(updatePassword(data), {
        loading: t('candidateSettings.loading'),
        success: t('candidateSettings.success'),
        error: t('candidateSettings.error'),
      })
    },
    [t],
  )

  return (
    <div className="grow">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-lg space-y-6 p-6">
          <h2 className="mb-5 text-2xl font-bold text-slate-800">{t('accountSettings.header')}</h2>
          <section>
            <h2 className="mb-1 text-xl font-bold leading-snug text-slate-800">
              {t('accountSettings.email')}
            </h2>
            <div className="text-sm">{t('accountSettings.emailDescription')}</div>
            <div className="mt-5 flex flex-wrap">
              <label className="sr-only" htmlFor="email">
                {t('accountSettings.email')}
              </label>
              <Input
                id="email"
                type="email"
                placeholder={t('accountSettings.emailPlaceholder')}
                value={user?.email}
                disabled
                readOnly
              />
            </div>
          </section>
          <section>
            <h2 className="mb-1 text-xl font-bold leading-snug text-slate-800">
              {t('accountSettings.password')}
            </h2>
            <div className="text-sm">{t('accountSettings.passwordDescription')}</div>
            <div className="mt-4 space-y-4">
              {showSetNewPassword && (
                <div className="mt-4 space-y-4">
                  <div>
                    <Label>
                      {t('accountSettings.newPassword')} <span className="text-red-500">*</span>
                    </Label>
                    <FormInputField
                      type="password"
                      name="password"
                      placeholder={t('accountSettings.newPasswordPlaceholder')}
                      register={register}
                      error={errors.password}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label>
                      {t('accountSettings.confirmPassword')} <span className="text-red-500">*</span>
                    </Label>
                    <FormInputField
                      type="password"
                      name="passwordConfirm"
                      placeholder={t('accountSettings.confirmPasswordPlaceholder')}
                      register={register}
                      error={errors.passwordConfirm}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
              <Button type="button" onClick={() => setShowSetNewPassword(!showSetNewPassword)}>
                {showSetNewPassword ? t('ui.cancel') : t('accountSettings.setNewPassword')}
              </Button>
            </div>
          </section>
        </div>
        <footer>
          <div className="flex flex-col border-t border-slate-200 px-6 py-5">
            <div className="flex gap-4 self-end">
              <Link href="/account">
                <Button type="button" variant="outline">
                  {t('ui.cancel')}
                </Button>
              </Link>
              <Button disabled={!isDirty}>{t('ui.saveChanges')}</Button>
            </div>
          </div>
        </footer>
      </form>
    </div>
  )
}

export { AccountPanel }

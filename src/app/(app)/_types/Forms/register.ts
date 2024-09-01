import { z, ZodType } from 'zod'
import { useTranslations } from 'next-intl'

type CreateBaseArgs = {
  email: string
  password: string
  passwordConfirm: string
  processingOfPersonalData: boolean
}

type CreateCandidateArgs = CreateBaseArgs & {
  role: 'candidate'
  firstName: string
  lastName: string
}

type CreateOrganizationArgs = CreateBaseArgs & {
  role: 'organization'
  title: string
  vatId: string
  terms: boolean
}

type RegisterFormData = CreateCandidateArgs | CreateOrganizationArgs

const useRegisterFieldSchema = (): ZodType<RegisterFormData> => {
  const t = useTranslations('register.validation')

  const baseSchema = {
    email: z.string().email(t('email')),
    password: z
      .string()
      .min(6, t('passwordLength', { number: 6 }))
      .max(32, {
        message: t('passwordMaxLength', { number: 32 }),
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/, {
        message: t('passwordAllowedCharacters'),
      })
      .regex(/^[^\s]+$/, {
        message: t('passwordForbiddenCharacters'),
      }),
    passwordConfirm: z.string(),
    processingOfPersonalData: z.boolean().refine(data => data === true, {
      message: t('processingOfPersonalData'),
    }),
  }

  return z
    .discriminatedUnion('role', [
      z.object({
        ...baseSchema,
        role: z.literal('candidate'),
        firstName: z
          .string()
          .min(2, t('firstNameLength', { number: 2 }))
          .regex(/^[a-zA-ZÀ-ž ]+$/, t('firstNameAllowedCharacters')),
        lastName: z
          .string()
          .min(2, t('lastNameLength', { number: 2 }))
          .regex(/^[a-zA-ZÀ-ž ]+$/, t('lastNameAllowedCharacters')),
      }),
      z.object({
        ...baseSchema,
        role: z.literal('organization'),
        title: z
          .string()
          .min(2, t('titleLength', { number: 2 }))
          .regex(/^[a-zA-Z0-9À-ž. ]+$/, t('titleAllowedCharacters'))
          .regex(/^[^\s].+$/, t('titleForbiddenCharacters')),
        vatId: z
          .string()
          .length(8, t('vatIdLength', { number: 8 }))
          .regex(/^[0-9]+$/, t('vatIdAllowedCharacters')),
        terms: z.boolean().refine(data => data === true, {
          message: t('terms'),
        }),
      }),
    ])
    .refine(data => data.password === data.passwordConfirm, {
      message: t('passwordConfirm'),
      path: ['passwordConfirm'],
    })
}

export { type RegisterFormData, useRegisterFieldSchema }

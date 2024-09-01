import { z, ZodType } from 'zod'
import { useTranslations } from 'next-intl'

const ACCEPTED_FILE_TYPES = ['application/pdf']
const MAX_FILE_SIZE = 3

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024)

  return +result.toFixed(decimalsNum)
}

type ApplicationFormData = {
  status: 'pending' | 'approved' | 'rejected'
  job: string
  organization: string
  firstName: string
  lastName: string
  email: string
  location?: string
  phone?: string
  bio?: string
  coverLetter?: string
  cv: File
  processingOfPersonalData: boolean
}

const useApplicationFieldSchema = (): ZodType<ApplicationFormData> => {
  const t = useTranslations('applyForm.validation')

  return z.object({
    status: z.enum(['pending', 'approved', 'rejected']),
    job: z.string(),
    organization: z.string(),
    firstName: z
      .string({ message: t('firstName') })
      .min(2, { message: t('firstNameLength', { number: 2 }) })
      .regex(/^[a-zA-ZÀ-ž ]+$/, {
        message: t('firstNameAllowedCharacters'),
      }),
    lastName: z
      .string({ message: t('lastName') })
      .min(2, { message: t('lastNameLength', { number: 2 }) })
      .regex(/^[a-zA-ZÀ-ž ]+$/, {
        message: t('lastNameAllowedCharacters'),
      }),
    email: z.string().email({ message: t('email') }),
    location: z.string().optional(),
    phone: z.string().optional(),
    bio: z.string().optional(),
    coverLetter: z.string().optional(),
    cv: z.custom<File>().superRefine((file, ctx) => {
      if (!file) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('cv'),
        })

        return z.NEVER
      }

      if (sizeInMB(file.size) > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('maxFileSize', { size: MAX_FILE_SIZE }),
        })

        return z.NEVER
      }

      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('unsupportedFileType'),
        })

        return z.NEVER
      }
    }),
    processingOfPersonalData: z
      .boolean()
      .refine(value => value, { message: t('processingOfPersonalData') }),
  })
}

export { type ApplicationFormData, useApplicationFieldSchema }

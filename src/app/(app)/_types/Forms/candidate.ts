import { z, ZodType } from "zod"
import { useTranslations } from 'next-intl'

import { FileSchema } from "./file"
import { Photo } from "@payload-types"

const PhotoSchema = FileSchema

type CandidateFormData = {
    firstName: string
    lastName: string
    location?: string
    phone?: string
    bio?: string
    photo?: Photo | null
}

const useCandidateFieldSchema = (): ZodType<CandidateFormData> => {
    const t = useTranslations('candidateSettings.validation')

    return z.object({
        firstName: z.string({ message: t('firstName') }).min(2, { message: t('firstNameLength', { number: 2 }) }).regex(/^[a-zA-Z ]+$/, {
            message: t('firstNameAllowedCharacters'),
        }),
        lastName: z.string({ message: t('lastName') }).min(2, { message: t('lastNameLength', { number: 2 }) }).regex(/^[a-zA-Z ]+$/, {
            message: t('lastNameAllowedCharacters')
        }),
        location: z.string().optional(),
        phone: z.string().optional(),
        bio: z.string().optional(),
        logo: PhotoSchema.optional(),
    })
}


export { type CandidateFormData, useCandidateFieldSchema }

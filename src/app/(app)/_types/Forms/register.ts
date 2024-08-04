import { z, ZodType } from "zod"
import { useTranslations } from "next-intl"

type RegisterFormData = {
    email: string
    password: string
    passwordConfirm: string
    role: 'candidate' | 'organization'
    title?: string
    firstName?: string
    lastName?: string
}

const useRegisterFieldSchema = (): ZodType<RegisterFormData> => {
    const t = useTranslations('register.validation')

    return z.object({
        email: z.string().email(t('email')),
        password: z.string().min(6, t('passwordLength', { number: 6 })).max(32, {
            message: t('passwordMaxLength', { number: 32 }),
        }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/, {
            message: t('passwordAllowedCharacters'),
        }).regex(/^[^\s]+$/, {
            message: t('passwordForbiddenCharacters'),
        }),
        passwordConfirm: z.string(),
        role: z.enum(['candidate', 'organization']),
        title: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
    })
        .superRefine((data, ctx) => {
            if (data.password !== data.passwordConfirm) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['passwordConfirm'],
                    message: t('passwordConfirm'),
                })
            }

            if (data.role === 'organization') {
                if (!data.title || data.title.trim() === '') {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        path: ['title'],
                        message: t('title'),
                    })
                } else {
                    const titleSchema = z.string().min(2, {
                        message: t('titleLength', { number: 2 }),
                    }).regex(/^[a-zA-Z0-9 ]+$/, {
                        message: t('titleAllowedCharacters'),
                    }).regex(/^[^\s].+$/, {
                        message: t('titleForbiddenCharacters')
                    })

                    const titleCheck = titleSchema.safeParse(data.title)

                    if (!titleCheck.success) {
                        titleCheck.error.issues.forEach(issue => {
                            ctx.addIssue({
                                ...issue,
                                path: ['title'],
                            })
                        })
                    }
                }
            } else if (data.role === 'candidate') {
                if (!data.firstName || data.firstName.trim() === '') {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        path: ['firstName'],
                        message: t('firstName'),
                    })
                } else {
                    const firstNameSchema = z.string().min(2, {
                        message: t('firstNameLength', { number: 2 }),
                    }).regex(/^[a-zA-Z ]+$/, {
                        message: t('firstNameAllowedCharacters'),
                    })

                    const firstNameCheck = firstNameSchema.safeParse(data.firstName)

                    if (!firstNameCheck.success) {
                        firstNameCheck.error.issues.forEach(issue => {
                            ctx.addIssue({
                                ...issue,
                                path: ['firstName'],
                            })
                        })
                    }
                }

                if (!data.lastName || data.lastName.trim() === '') {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        path: ['lastName'],
                        message: t('lastName'),
                    })
                } else {
                    const lastNameSchema = z.string().min(2, {
                        message: t('lastNameLength', { number: 2 }),
                    }).regex(/^[a-zA-Z ]+$/, {
                        message: t('lastNameAllowedCharacters'),
                    })

                    const lastNameCheck = lastNameSchema.safeParse(data.lastName)

                    if (!lastNameCheck.success) {
                        lastNameCheck.error.issues.forEach(issue => {
                            ctx.addIssue({
                                ...issue,
                                path: ['lastName'],
                            })
                        })
                    }
                }
            }
        })
}

export { type RegisterFormData, useRegisterFieldSchema }

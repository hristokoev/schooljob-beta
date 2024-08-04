import { useTranslations } from "next-intl";
import { z, ZodType } from "zod"

type ResetPasswordFormData = {
    password: string;
    passwordConfirm: string;
}

const useResetPasswordFieldSchema = (): ZodType<ResetPasswordFormData> => {
    const t = useTranslations('accountSettings.validation')

    return z.object({
        password: z.string().min(6, t('passwordLength', { number: 6 })).max(32, {
            message: t('passwordMaxLength', { number: 32 }),
        }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/, {
            message: t('passwordAllowedCharacters'),
        }).regex(/^[^\s]+$/, {
            message: t('passwordForbiddenCharacters'),
        }),
        passwordConfirm: z.string(),
    }).superRefine((data, ctx) => {
        if (data.password !== data.passwordConfirm) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['passwordConfirm'],
                message: t('passwordConfirm'),
            });
        }
    })
}


export { type ResetPasswordFormData, useResetPasswordFieldSchema }

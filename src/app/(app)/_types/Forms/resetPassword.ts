import { z, ZodType } from "zod"

type ResetPasswordFormData = {
    password: string;
    passwordConfirm: string;
}

const ResetPasswordFieldSchema: ZodType<ResetPasswordFormData> = z
    .object({
        password: z.string().min(8, 'Password must be at least 8 characters').max(32, {
            message: 'Password must be less than 32 characters',
        }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
        }).regex(/^[^\s]+$/, {
            message: 'Password cannot contain spaces',
        }),
        passwordConfirm: z.string(),
    }).superRefine((data, ctx) => {
        if (data.password !== data.passwordConfirm) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['passwordConfirm'],
                message: 'Passwords do not match',
            });
        }
    })


export { type ResetPasswordFormData, ResetPasswordFieldSchema }

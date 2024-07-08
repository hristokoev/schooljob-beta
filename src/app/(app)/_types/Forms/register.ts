import { z, ZodType } from "zod"

type RegisterFormData = {
    email: string
    password: string
    passwordConfirm: string
    role: 'candidate' | 'organization'
    title?: string
    firstName?: string
    lastName?: string
}

const RegisterFieldSchema: ZodType<RegisterFormData> = z
    .object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters').max(32, {
            message: 'Password must be less than 32 characters',
        }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
        }).regex(/^[^\s]+$/, {
            message: 'Password cannot contain spaces',
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
                message: 'Passwords do not match',
            });
        }

        if (data.role === 'organization') {
            if (!data.title || data.title.trim() === '') {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['title'],
                    message: 'Title is required',
                });
            } else {
                const titleSchema = z.string().min(2, {
                    message: 'Title must be at least 2 characters',
                }).regex(/^[a-zA-Z0-9 ]+$/, {
                    message: 'Title can only contain letters, numbers, and spaces',
                }).regex(/^[^\s].+$/, {
                    message: 'Title cannot contain only spaces',
                });

                const titleCheck = titleSchema.safeParse(data.title);
                if (!titleCheck.success) {
                    titleCheck.error.issues.forEach(issue => {
                        ctx.addIssue({
                            ...issue,
                            path: ['title'],
                        });
                    });
                }
            }
        } else if (data.role === 'candidate') {
            if (!data.firstName || data.firstName.trim() === '') {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['firstName'],
                    message: 'First Name is required',
                });
            } else {
                const firstNameSchema = z.string().min(2, {
                    message: 'First Name must be at least 2 characters',
                }).regex(/^[a-zA-Z ]+$/, {
                    message: 'First Name can only contain letters and spaces',
                });

                const firstNameCheck = firstNameSchema.safeParse(data.firstName);
                if (!firstNameCheck.success) {
                    firstNameCheck.error.issues.forEach(issue => {
                        ctx.addIssue({
                            ...issue,
                            path: ['firstName'],
                        });
                    });
                }
            }

            if (!data.lastName || data.lastName.trim() === '') {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['lastName'],
                    message: 'Last Name is required',
                });
            } else {
                const lastNameSchema = z.string().min(2, {
                    message: 'Last Name must be at least 2 characters',
                }).regex(/^[a-zA-Z ]+$/, {
                    message: 'Last Name can only contain letters and spaces',
                });

                const lastNameCheck = lastNameSchema.safeParse(data.lastName);
                if (!lastNameCheck.success) {
                    lastNameCheck.error.issues.forEach(issue => {
                        ctx.addIssue({
                            ...issue,
                            path: ['lastName'],
                        });
                    });
                }
            }
        }
    });

export { type RegisterFormData, RegisterFieldSchema }

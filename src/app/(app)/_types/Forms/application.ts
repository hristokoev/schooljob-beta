import { z, ZodType } from "zod"

const ACCEPTED_FILE_TYPES = ['application/pdf']
const MAX_FILE_SIZE = 3

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
    const result = sizeInBytes / (1024 * 1024)

    return +result.toFixed(decimalsNum)
}

type ApplicationFormData = {
    status: 'pending' | 'approved' | 'rejected',
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
}

const ApplicationFieldSchema: ZodType<ApplicationFormData> = z
    .object({
        status: z.enum(['pending', 'approved', 'rejected']),
        job: z.string(),
        organization: z.string(),
        firstName: z.string().min(2, { message: 'First name is required' }),
        lastName: z.string().min(2, { message: 'Last name is required' }),
        email: z.string().email({ message: 'Invalid email address' }),
        location: z.string().optional(),
        phone: z.string().optional(),
        bio: z.string().optional(),
        coverLetter: z.string().optional(),
        cv: z.custom<File>().superRefine((file, ctx) => {
            if (!file) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'PDF file is required',
                })

                return z.NEVER
            }

            if (sizeInMB(file.size) > MAX_FILE_SIZE) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `The maximum file size is ${MAX_FILE_SIZE}MB`,
                })

                return z.NEVER
            }

            if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'File type is not supported',
                })

                return z.NEVER
            }
        }),
    })


export { type ApplicationFormData, ApplicationFieldSchema }

import { z, ZodType } from "zod"

import { Cv } from "@payload-types"
import { FileSchema } from "./file"

type ApplicationFormData = {
    job: string
    organization: string
    firstName: string
    lastName: string
    email: string
    location?: string
    phone?: string
    bio?: string
    coverLetter?: string
    cv?: Cv
}

const ApplicationFieldSchema: ZodType<ApplicationFormData> = z
    .object({
        job: z.string(),
        organization: z.string(),
        firstName: z.string().min(2, { message: 'First name is required' }),
        lastName: z.string().min(2, { message: 'Last name is required' }),
        email: z.string().email({ message: 'Invalid email address' }),
        location: z.string().optional(),
        phone: z.string().optional(),
        bio: z.string().optional(),
        coverLetter: z.string().optional(),
        cv: FileSchema.optional(),
    })


export { type ApplicationFormData, ApplicationFieldSchema }

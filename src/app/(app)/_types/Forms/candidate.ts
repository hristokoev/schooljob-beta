import { z, ZodType } from "zod"

type CandidateFormData = {
    location?: string
    phone?: string
    bio?: string
}

const CandidateFieldSchema: ZodType<CandidateFormData> = z
    .object({
        location: z.string().optional(),
        phone: z.string().optional(),
        bio: z.string().optional(),
    })


export { type CandidateFormData, CandidateFieldSchema }

import { z, ZodType } from "zod"

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

const CandidateFieldSchema: ZodType<CandidateFormData> = z
    .object({
        firstName: z.string(),
        lastName: z.string(),
        location: z.string().optional(),
        phone: z.string().optional(),
        bio: z.string().optional(),
        logo: PhotoSchema.optional(),
    })


export { type CandidateFormData, CandidateFieldSchema }

import { z } from "zod"

const FileSchema = z.object({
    id: z.string(),
    createdBy: z.string().optional(),
    prefix: z.string().nullable().optional(),
    updatedAt: z.string(),
    createdAt: z.string(),
    url: z.string().nullable().optional(),
    thumbnailURL: z.string().nullable().optional(),
    filename: z.string().nullable().optional(),
    mimeType: z.string().nullable().optional(),
    filesize: z.number().nullable().optional(),
    width: z.number().nullable().optional(),
    height: z.number().nullable().optional(),
    focalX: z.number().nullable().optional(),
    focalY: z.number().nullable().optional(),
})

export { FileSchema }

import { ImageCover, Logo } from "@payload-types"
import { z, ZodType } from "zod"

import { FileSchema } from "./file"

type Option = {
    label: string
    value: string
}

const LogoSchema = FileSchema
const ImageCoverSchema = FileSchema

type OrganizationFormData = {
    title: string
    vatId?: string
    categories?: Option[]
    location?: string
    phone?: string
    url?: string
    description?: string
    richText?: {
        root: {
            type: string;
            children: {
                type: string;
                version: number;
                [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
        };
        [k: string]: unknown;
    } | null,
    logo?: Logo | null
    imageCover?: ImageCover | null
}

const OrganizationFieldSchema: ZodType<OrganizationFormData> = z
    .object({
        title: z.string().min(2, {
            message: 'Title must be at least 2 characters',
        }).regex(/^[a-zA-Z0-9 ]+$/, {
            message: 'Title can only contain letters, numbers, and spaces',
        }).regex(/^[^\s].+$/, {
            message: 'Title cannot contain only spaces',
        }),
        vatId: z.string().optional(),
        categories: z.array(z.object({
            label: z.string(),
            value: z.string(),
        })).optional(),
        location: z.string().optional(),
        phone: z.string().optional(),
        url: z.string().optional(),
        description: z.string().optional(),
        richText: z.object({
            root: z.object({
                type: z.string(),
                children: z.array(z.object({
                    type: z.string(),
                    version: z.coerce.number(),
                }).passthrough()),
                direction: z.enum(['ltr', 'rtl']).nullable(),
                format: z.enum(['left', 'start', 'center', 'right', 'end', 'justify', '']),
                indent: z.coerce.number(),
                version: z.coerce.number(),
            }).passthrough(),
        }).optional(),
        logo: LogoSchema.optional(),
        imageCover: ImageCoverSchema.optional(),
    })


export { type OrganizationFormData, OrganizationFieldSchema }

import { ImageCover, Logo } from "@payload-types"
import { z, ZodType } from "zod"
import { useTranslations } from 'next-intl'

import { FileSchema } from "./file"

type Option = {
    label: string
    value: string
}

const LogoSchema = FileSchema
const ImageCoverSchema = FileSchema

type OrganizationFormData = {
    title: string
    vatId: string
    categories?: Option[]
    location?: Option[]
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

const useOrganizationFieldSchema = (): ZodType<OrganizationFormData> => {
    const t = useTranslations('organizationSettings.validation')

    return z.object({
        title: z.string({ message: t('title') }).min(2, {
            message: t('titleLength', { number: 2 }),
        }).regex(/^[a-zA-Z0-9À-ž. ]+$/, {
            message: t('titleAllowedCharacters'),
        }).regex(/^[^\s].+$/, {
            message: t('titleForbiddenCharacters')
        }),
        vatId: z.string().length(8, {
            message: t('vatIdLength', { number: 8 }),
        }).regex(/^[0-9]+$/, {
            message: t('vatIdAllowedCharacters'),
        }),
        categories: z.array(z.object({
            label: z.string(),
            value: z.string(),
        })).optional(),
        location: z.array(z.object({
            label: z.string(),
            value: z.string(),
        })).optional(),
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
}

export { type OrganizationFormData, useOrganizationFieldSchema }

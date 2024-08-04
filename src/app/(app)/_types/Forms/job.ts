// TODO: Error handling

import { z, ZodType } from "zod"

type Option = {
    label: string
    value: string
}

type JobFormData = {
    status: 'unpublished' | 'published'
    title: string
    categories: Option[]
    employmentType: Option[]
    location?: string
    locationType?: Option[]
    education?: Option[]
    experience?: Option[]
    language?: Option[]
    salary?: {
        enabled?: boolean
        range?: boolean
        base?: number
        minSalary?: number
        maxSalary?: number
        currency?: Option
        salaryType?: Option
    }
    description?: string
    richText?: {
        root: {
            type: string
            children: {
                type: string
                version: number
                [k: string]: unknown
            }[]
            direction: ('ltr' | 'rtl') | null
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
            indent: number
            version: number
        }
        [k: string]: unknown
    }
    skills?: string[]
    certifications?: string[]
    responsibilities?: string[]
    benefits?: string[]
    suitableFor?: {
        students?: boolean
        disabledPeople?: boolean
        mothersOnMaternityLeave?: boolean
        retirees?: boolean
    }
    customApplyUrl?: string
}

const JobFieldSchema: ZodType<JobFormData> = z
    .object({
        status: z.enum(['unpublished', 'published']),
        title: z.string(),
        categories: z.array(z.object({
            label: z.string(),
            value: z.string(),
        })),
        employmentType: z.array(z.object({
            label: z.string(),
            value: z.string(),
        })),
        location: z.string().optional(),
        locationType: z.array(z.object({
            label: z.string(),
            value: z.string(),
        })).optional(),
        education: z.array(z.object({
            label: z.string(),
            value: z.string(),
        })).optional(),
        experience: z.array(z.object({
            label: z.string(),
            value: z.string(),
        })).optional(),
        language: z.array(z.object({
            label: z.string(),
            value: z.string(),
        })).optional(),
        salary: z.object({
            enabled: z.boolean().optional(),
            range: z.boolean().optional(),
            base: z.coerce.number().optional(),
            minSalary: z.coerce.number().optional(),
            maxSalary: z.coerce.number().optional(),
            currency: z.object({
                label: z.string(),
                value: z.string(),
            }).optional(),
            salaryType: z.object({
                label: z.string(),
                value: z.string(),
            }).optional(),
        }).optional(),
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
        skills: z.array(z.string()).optional(),
        certifications: z.array(z.string()).optional(),
        responsibilities: z.array(z.string()).optional(),
        benefits: z.array(z.string()).optional(),
        suitableFor: z.object({
            students: z.boolean().optional(),
            disabledPeople: z.boolean().optional(),
            mothersOnMaternityLeave: z.boolean().optional(),
            retirees: z.boolean().optional(),
        }).optional(),
        customApplyUrl: z.string().optional(),
    })

export { type Option, type JobFormData, JobFieldSchema }

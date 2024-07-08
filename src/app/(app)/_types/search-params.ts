/* 
    Throughout the whole app, we use the types provided by Payload in 'payload-types.ts'.
    However, we need a custom interface for the search parameters of the job search.

    TODO: Revisit this file and check if it's still necessary.
*/

interface JobSearchParams {
    limit?: number
    page?: number
    sort?: string
    loadMore?: boolean
    createdAt?: Date
    status?: string
    featured?: boolean
    title?: string
    organization?: string
    salary?: number
    employmentType?: string[]
    education?: string[]
    language?: string[]
    locationType?: string[]
    students?: boolean
    mothersOnMaternityLeave?: boolean
    disabledPeople?: boolean
    retirees?: boolean
}

interface OrganizationSearchParams {
    limit?: number
    page?: number
    sort?: string
    loadMore?: boolean
    featured?: boolean
}

export type { JobSearchParams, OrganizationSearchParams }

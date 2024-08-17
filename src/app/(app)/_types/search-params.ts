/* 
    Throughout the whole app, we use the types provided by Payload in 'payload-types.ts'.
    However, we need a custom interface for the search parameters of the job search.

    TODO: Revisit this file and check if it's still necessary.
*/

type SuitableFor = 'students' | 'mothersOnMaternityLeave' | 'disabledPeople' | 'retirees'

interface JobSearchParams {
    limit?: number
    page?: number
    sort?: string
    loadMore?: boolean
    createdAt?: Date
    status?: string
    featured?: boolean
    organization?: string
    categories?: string[]
    salary?: number
    employmentType?: string[]
    education?: string[]
    language?: string[]
    location?: string[]
    locationType?: string[]
    suitableFor?: SuitableFor[]
}

interface OrganizationSearchParams {
    limit?: number
    page?: number
    sort?: string
    categories?: string[]
    location?: string[]
    loadMore?: boolean
    featured?: boolean
}

export type { JobSearchParams, OrganizationSearchParams }

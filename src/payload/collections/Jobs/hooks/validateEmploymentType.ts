import { CollectionBeforeValidateHook, ValidationError } from "payload"

const validateEmploymentType: CollectionBeforeValidateHook = async ({ data, req: { i18n, payload, user } }) => {
    const { t } = i18n

    try {
        const orderDoc = await payload.findByID({
            collection: 'orders',
            id: data?.order,
            depth: 0,
            overrideAccess: false,
            user
        })

        const membershipDoc = await payload.findByID({
            collection: 'memberships',
            id: typeof orderDoc?.membership === 'string' ? orderDoc?.membership : orderDoc?.membership?.id,
            depth: 0,
            overrideAccess: false,
        })

        const { jobsEmploymentType } = membershipDoc

        if (data?.employmentType && Array.isArray(data.employmentType)) {
            const allTypesValid = data.employmentType.every(type => jobsEmploymentType.includes(type))

            if (!allTypesValid) {
                throw new ValidationError({
                    collection: 'jobs',
                    errors: [{ field: 'employmentType', message: t('validation:invalidSelection') }],
                })
            }
        }
    } catch (error) {
        console.error(error)
        throw new ValidationError({
            collection: 'jobs',
            errors: [{ field: 'employmentType', message: t('validation:invalidSelection') }],
        })
    }

    return data
}

export { validateEmploymentType }

import type { CollectionBeforeChangeHook } from 'payload'

export const populateOrder: CollectionBeforeChangeHook = async ({ data, req: { payload, user }, operation, context }) => {
    if (operation === 'create') {
        if (user) {
            try {
                const [membershipDoc, organizationDoc] = await Promise.all([
                    await payload.findByID({
                        collection: 'memberships',
                        id: data.membership,
                        depth: 0,
                    }),
                    await payload.findByID({
                        collection: 'organizations',
                        id: data.organization,
                        depth: 0
                    })
                ])

                // Overwrite the price with the membership price for safety
                let basePrice = membershipDoc.price * data.count
                console.log('basePrice', basePrice)

                // If the organization has a custom membership option, use that instead
                const organizationMemberships = organizationDoc.memberships

                if (organizationMemberships && organizationMemberships.length > 0) {
                    const newMembership = organizationMemberships.find(customOption => customOption.membership === data.membership)

                    if (newMembership) {
                        basePrice = newMembership.price * data.count
                    }
                }

                if (membershipDoc.discounts && membershipDoc.discounts.length > 0) {
                    // Sort the discounts by count in descending order
                    const sortedDiscounts = membershipDoc.discounts.sort((a, b) => b.count - a.count)

                    // Find the first discount that matches the count
                    const applicableDiscount = sortedDiscounts.find(discount => data.count >= discount.count)

                    if (applicableDiscount) {
                        const discountAmount = basePrice * (applicableDiscount.discount / 100)
                        basePrice -= discountAmount
                    }
                }

                data.price = basePrice
                data.organization = organizationDoc.id
                data.currency = membershipDoc.currency
                data.jobsAllowed = data.count

                // Add jobsAllowed from organization to context
                context.jobsAllowed = organizationDoc.jobsAllowed
            } catch (error) {
                throw new Error('Error populating price: ' + error)
            }

            return data
        }
    }

    return data
}

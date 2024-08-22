import type { CollectionBeforeChangeHook } from 'payload'

import { isOrganization } from '@/utilities/getRole'

export const populateOrder: CollectionBeforeChangeHook = async ({ data, req: { payload, user }, operation, context }) => {
    if (operation === 'create') {
        if (user) {
            try {

                const [membershipDoc, organization] = await Promise.all([
                    await payload.findByID({
                        collection: 'memberships',
                        id: data.membership,
                        depth: 0,
                    }),
                    await payload.findByID({
                        collection: 'organizations',
                        id: isOrganization(user) ? user.profile.value.id : user.id,
                        depth: 0
                    }),
                ])

                // Overwrite the price with the membership price for safety
                let basePrice = membershipDoc.price * data.quantity

                // If the organization has a custom membership option, use that instead
                const organizationMemberships = organization.memberships

                if (organizationMemberships && organizationMemberships.length > 0) {
                    const newMembership = organizationMemberships.find(customOption => customOption.membership === data.membership)

                    if (newMembership) {
                        basePrice = newMembership.price * data.quantity
                    }
                }

                if (membershipDoc.discount && membershipDoc.discount.length > 0) {
                    // Sort the discounts by count in descending order
                    const sortedDiscounts = membershipDoc.discount.sort((a, b) => b.count - a.count)

                    // Find the first discount that matches the quantity
                    const applicableDiscount = sortedDiscounts.find(discount => data.quantity >= discount.count)

                    if (applicableDiscount) {
                        const discountAmount = basePrice * (applicableDiscount.discount / 100)
                        basePrice -= discountAmount
                    }
                }

                data.price = basePrice
                data.organization = organization.id
                data.currency = membershipDoc.currency
                data.expiresAt = new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)

                // Add jobsAllowed from organization to context
                context.jobsAllowed = organization.jobsAllowed
            } catch (error) {
                throw new Error('Error populating price: ' + error)
            }

            return data
        }
    }

    return data
}

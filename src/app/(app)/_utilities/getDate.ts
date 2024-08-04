// TODO: Localize

import { formatDistance, isAfter, subDays } from "date-fns"
import { cs } from "date-fns/locale"

export function formatDate(createdAt: string): string {
    const date = new Date(createdAt)

    return formatDistance(date, new Date(), {
        addSuffix: true,
        locale: cs,
    })
}

export function isWithinLast3Days(createdAt: string): boolean {
    const now = new Date()
    const date = new Date(createdAt)
    const threeDaysAgo = subDays(now, 3)

    return isAfter(date, threeDaysAgo)
}

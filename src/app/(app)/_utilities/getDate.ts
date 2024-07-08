import { cs, enGB } from "date-fns/locale"
import { formatDistance, isAfter, subDays } from "date-fns"

export function formatDate(createdAt: string): string {
    const date = new Date(createdAt)

    return formatDistance(date, new Date(), {
        addSuffix: true,
        locale: enGB,
    })
}

export function isWithinLast3Days(createdAt: string): boolean {
    const now = new Date()
    const date = new Date(createdAt)
    const threeDaysAgo = subDays(now, 3)

    return isAfter(date, threeDaysAgo)
}

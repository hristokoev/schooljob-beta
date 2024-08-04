import { Job } from '@payload-types'

type FormatSalaryProps = {
    value: number
    currency: string
    format?: string
}

function formatSalary({ value, currency, format = 'cs-CZ' }: FormatSalaryProps): string {
    const formatter = new Intl.NumberFormat(format, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
    })

    return formatter.format(value)
}

function renderSalary(salary: Job['salary'], lang?: string): string | null {
    if (!salary || !salary?.enabled) {
        return null
    }

    if (salary?.enabled && salary.range) {
        return `${formatSalary({
            value: salary.minSalary as number,
            currency: salary.currency as string,
            format: lang,
        })} - ${formatSalary({
            value: salary.maxSalary as number,
            currency: salary.currency as string,
            format: lang,
        })}`
    }

    return `${formatSalary({
        value: salary.base as number,
        currency: salary.currency as string,
        format: lang,
    })}`
}

export { renderSalary }

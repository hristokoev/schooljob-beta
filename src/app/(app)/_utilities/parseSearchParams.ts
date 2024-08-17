const parseValue = (value: string | number) => {
    // Check for boolean values
    if (value === 'true') return true
    if (value === 'false') return false

    // Check for numbers (integers or floats)
    if (!isNaN(Number(value)) && (value as string).trim() !== '') return parseFloat(String(value))

    // Check for comma-separated values and return as array of strings
    if (typeof value === 'string' && value.includes(',')) return value.split(',').map(item => item.trim())

    // Otherwise, return as string
    return value
}

export const parseSearchParams = (params: Record<string, string | number>) => {
    const parsedParams: Record<string, string | number | boolean | string[]> = {}

    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            parsedParams[key] = parseValue(params[key])
        }
    }

    return parsedParams
}

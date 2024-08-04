const parseValue = (value: string | number) => {
    // Check for boolean values
    if (value === 'true') return true
    if (value === 'false') return false

    // Check for numbers (integers or floats)
    if (!isNaN(Number(value)) && (value as string).trim() !== '') return parseFloat(String(value))

    // Otherwise, return as string
    return value
}

export const parseSearchParams = (params: Record<string, string | number>) => {
    const parsedParams: Record<string, string | number | boolean> = {}

    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            parsedParams[key] = parseValue(params[key])
        }
    }

    return parsedParams
}

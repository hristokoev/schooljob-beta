type ReplacementVariables = Record<string, string | number | boolean>

const replaceEmailVariables = (content: string, variables: ReplacementVariables): string => {
    const regex = /\[(\w+)(?::(\w+))?\]/g

    return content.replace(regex, (match, key, modifier) => {
        if (Object.prototype.hasOwnProperty.call(variables, key)) {
            let value = variables[key]

            // Apply modifier if present
            if (modifier) {
                switch (modifier) {
                    case 'uppercase':
                        value = String(value).toUpperCase()
                        break
                    case 'lowercase':
                        value = String(value).toLowerCase()
                        break
                    // Add more modifiers as needed
                }
            }

            return String(value)
        }

        return match // Return original if no replacement found
    })
}

export { replaceEmailVariables }
export type { ReplacementVariables }

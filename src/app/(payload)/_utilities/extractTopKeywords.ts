type RichText = {
    children?: RichText[]
    text?: string
    [key: string]: any // This allows for additional properties
}

function extractTopKeywords(richText: { root: RichText }, maxKeywords: number = 50): string[] {
    const wordCountMap = new Map<string, number>()

    function traverse(node: RichText): void {
        if (node.text) {
            // Split text into words and remove punctuation
            const words = node.text
                .split(/\s+/)
                .map(word => word.replace(/[^\w\s]|_/g, "").toLowerCase()) // Remove punctuation and convert to lower case
                .filter(word => word.trim().length > 0) // Filter out empty strings

            words.forEach(word => {
                wordCountMap.set(word, (wordCountMap.get(word) || 0) + 1)
            })
        }

        if (node.children) {
            node.children.forEach(child => traverse(child))
        }
    }

    traverse(richText.root)

    const sortedKeywords = Array.from(wordCountMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, maxKeywords)
        .map(entry => entry[0])

    return sortedKeywords
}

export { extractTopKeywords }

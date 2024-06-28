type RichText = {
    children?: RichText[]
    text?: string
    [key: string]: any // This allows for additional properties
}

function extractTopKeywords(richText: RichText[], maxKeywords: number = 50): string[] {
    const wordCountMap = new Map<string, number>()

    function traverse(nodes: RichText[]): void {
        nodes.forEach(node => {
            if (node.text) {
                // Split text into words and count each word
                const words = node.text.split(/\s+/).filter(word => word.trim().length > 0)
                words.forEach(word => {
                    word = word.toLowerCase() // Normalize to lower case
                    wordCountMap.set(word, (wordCountMap.get(word) || 0) + 1)
                })
            }

            if (node.children) {
                traverse(node.children)
            }
        })
    }

    traverse(richText)

    // Sort the words by frequency in descending order and take the top `maxKeywords`
    const sortedKeywords = Array.from(wordCountMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, maxKeywords)
        .map(entry => entry[0])

    return sortedKeywords
}

export { extractTopKeywords }

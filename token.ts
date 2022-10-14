export const findToken = (text: string, token: string) => {
    const regex = new RegExp(`"([^)]+)" \\(${token}\\)`, 'g')
    let matches: string[] = []
    for (let match: RegExpExecArray | null; (match = regex.exec(text)) !== null;) {
        matches.push(...match.map(m => m))
    }

    if (matches.length == 0) {
        return null
    }

    return matches?.filter((_, i) => {
        return (i % 2 != 0) // return only odd indexes
    })
}

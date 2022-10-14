export const findTokenIndexesOnColumns = (columns: string[], token: string) => {
    let indexesWithToken: number[] = []
    columns.forEach((c, i) => {
        if (c.includes(token)) {
            indexesWithToken.push(i)
        }
    });
    return indexesWithToken
}
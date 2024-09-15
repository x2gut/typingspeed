export const getAccuracy = (totalChars: number, mistakes: number) => {
    return ((totalChars - mistakes) / totalChars) * 100;
}
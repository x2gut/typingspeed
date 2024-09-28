export const getCurrentSlice = (
  shuffledWords: string[],
  slicedIndex: { startIndex: number; endIndex: number },
  containerWidth: number,
) => {
  const letterLength = 16.5;
  const letterMargin = 16;
  const currentSlice: string[][] = [[], [], []];

  let spaceAvailable = containerWidth;
  let currentSliceIndex = 0;

  for (let i = slicedIndex.startIndex; i < shuffledWords.length; i++) {
    const word = shuffledWords[i];
    const wordWidth = word.length * letterLength + letterMargin;

    if (wordWidth < spaceAvailable) {
      currentSlice[currentSliceIndex].push(word);
      spaceAvailable -= wordWidth;
    } else {
      currentSliceIndex++;
      if (currentSliceIndex >= currentSlice.length) break;
      spaceAvailable = containerWidth;
      i--;
    }
  }

  return currentSlice;
};

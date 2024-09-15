const getAvgWordLength = (array: string[]) => {
    const avarageWordsLength =
      array
        .slice(0, 50)
        .map((word) => word.length)
        .reduce((acc, length) => acc + length, 0) / 50;
   return avarageWordsLength;
}

export default getAvgWordLength;
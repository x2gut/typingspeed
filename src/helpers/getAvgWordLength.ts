const getAvgWordLength = (array: string[]) => {
    const avarageWordsLength =
      array
        .slice(0, 200)
        .map((word) => word.length)
        .reduce((acc, length) => acc + length, 0) / 200;
   return avarageWordsLength;
}

export default getAvgWordLength;
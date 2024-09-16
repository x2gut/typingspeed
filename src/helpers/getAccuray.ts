export const getAccuracy = (
    wordsAmount: number,
    avgWordsLength: number,
    mistakes: number,
    correctChars: number
  ) => {
    const totalChars = correctChars + mistakes;
    if (correctChars === 0) {
      return 0;
    }
    const accuracy = (correctChars / totalChars) * 100;
    
    return accuracy < 0 ? 0 : accuracy;
  };
  
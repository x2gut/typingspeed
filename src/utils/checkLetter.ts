const checkLetter = (
  keyPressed: string,
  wordsList: string[],
  currentWordIndex: number,
  currentLetterIndex: number
): string => {
  const currentWord = wordsList[currentWordIndex];

  const skipKeys = ["Escape", "Tab", "F5", "Alt", "Delete", "Enter", "Shift", "Control"];

  if (wordsList.length <= currentWordIndex) {
    return "GameCompleted";
  }
  if (keyPressed === " ") {
    if (currentLetterIndex > 0) {
      return "NextWord";
    } else {
      return "SkipKey";
    }
  }

  if (skipKeys.includes(keyPressed)) {
    return "SkipKey";
  }

  if (keyPressed === "Backspace") {
    return "BackspacePressed";
  }

  if (currentLetterIndex >= currentWord.length) {
    return "NextWord";
  }

  if (keyPressed === currentWord[currentLetterIndex]) {
    return "NextLetter";
  }

  if (
    keyPressed !== currentWord[currentLetterIndex] &&
    keyPressed !== "Shift"
  ) {
    return "MistakeInLetter";
  }
  return "NoAction";
};

export default checkLetter;

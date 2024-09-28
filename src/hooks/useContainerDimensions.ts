import { useState, useEffect } from "react";

const useContainerDimensions = (
  containerRef: React.RefObject<HTMLDivElement>,
  isTimeOut: boolean,
  wordsList: string[]
) => {
  const [wordsPerContainer, setWordsPerContainer] = useState(0);
  const [slicedIndex, setSlicedIndex] = useState({
    startIndex: 0,
    endIndex: 0,
  });
  const [wordsPerRow, setWordsPerRow] = useState(0);

  const calculateWordsPerContainer = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth - 56; // 56 == (padding left + padding right)
      const avgWordWidth =
        wordsList
          .slice(slicedIndex.startIndex, slicedIndex.endIndex + 10)
          .reduce((totalWidth, word) => {
            return totalWidth + word.length * 16.5 + 16;
          }, 0) /
        wordsList.slice(slicedIndex.startIndex, slicedIndex.endIndex + 10)
          .length;
      const wordsAmountPerLine = Math.floor(containerWidth / avgWordWidth);
      setWordsPerRow(wordsAmountPerLine);
      const linesAmount = 3;
      const wordsPerContainer = wordsAmountPerLine * linesAmount;
      setWordsPerContainer(wordsPerContainer);
    }
  };

  useEffect(() => {
    calculateWordsPerContainer();
  }, [isTimeOut, wordsList]);

  useEffect(() => {
    calculateWordsPerContainer();
  }, [containerRef.current]);

  return { wordsPerRow, wordsPerContainer, slicedIndex, setSlicedIndex };
};

export default useContainerDimensions;

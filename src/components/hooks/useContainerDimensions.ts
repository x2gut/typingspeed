import { useState, useEffect } from "react";

const useContainerDimensions = (
  containerRef: React.RefObject<HTMLDivElement>,
  isTimeOut: boolean
) => {
  const [wordsPerContainer, setWordsPerContainer] = useState(0);
  const [slicedIndex, setSlicedIndex] = useState({ startIndex: 0, endIndex: 0 });

  const calculateWordsPerContainer = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const avgWordWidth = 100;
      const avgWordHeight = 16.5 + 16 + 28;
      const wordsAmountPerLine = Math.floor(containerWidth / avgWordWidth);
      const linesAmount = Math.floor(containerHeight / avgWordHeight);
      const wordsPerContainer = wordsAmountPerLine * linesAmount;
      setWordsPerContainer(wordsPerContainer);
      setSlicedIndex({ startIndex: 0, endIndex: wordsPerContainer });
    }
  };

  useEffect(() => {
    calculateWordsPerContainer();
  }, [isTimeOut]);

  useEffect(() => {
    calculateWordsPerContainer();
  }, [containerRef.current]);

  return { wordsPerContainer, slicedIndex, setSlicedIndex };
};

export default useContainerDimensions;

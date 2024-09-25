import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import checkLetter from "../../utils/checkLetter";
import {
  setCorrectChars,
  setMistakes,
  setWordsAmount,
} from "../../utils/resultUtil";
import { GameSettings, LetterStates, ResultData } from "../../types/types";

interface KeyboardHandlerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  isGameStarted: boolean;
  currentWordIndex: number;
  currentLetterIndex: number;
  slicedIndex: { startIndex: number; endIndex: number };
  setCurrentWordIndex: Dispatch<SetStateAction<number>>;
  setCurrentLetterIndex: Dispatch<SetStateAction<number>>;
  setLetterStates: Dispatch<SetStateAction<LetterStates>>;
  setGameSettings: Dispatch<SetStateAction<GameSettings>>;
  setSlicedIndex: Dispatch<
    SetStateAction<{ startIndex: number; endIndex: number }>
  >;
  setResultData: Dispatch<SetStateAction<ResultData>>;
  letterStates: LetterStates;
  wordsList: string[];
  wordsPerContainer: number;
}

const KeyboardHandler: React.FC<KeyboardHandlerProps> = ({
  containerRef,
  isGameStarted,
  currentWordIndex,
  currentLetterIndex,
  slicedIndex,
  setCurrentWordIndex,
  setCurrentLetterIndex,
  setLetterStates,
  setGameSettings,
  setSlicedIndex,
  letterStates,
  wordsList,
  wordsPerContainer,
  setResultData,
}) => {
  const handleNextWord = () => {
    if (currentWordIndex >= slicedIndex.endIndex - 1) {
      setCurrentWordIndex((prevIndex) => prevIndex + 1);
      setCurrentLetterIndex(0);
      setLetterStates({});
      const newEndIndex = Math.min(
        slicedIndex.endIndex + wordsPerContainer,
        wordsList.length
      );
      setSlicedIndex({
        startIndex: slicedIndex.endIndex,
        endIndex: newEndIndex,
      });
    } else {
      setCurrentWordIndex((prevIndex) => prevIndex + 1);
      setCurrentLetterIndex(0);

      const countMistakes = Object.values(
        letterStates[currentWordIndex]
      ).filter((value) => value === "incorrect").length;

      const correctChars =
        Object.values(letterStates[currentWordIndex]).length - countMistakes;

      if (countMistakes === 0) {
        setWordsAmount(setResultData);
      }

      setMistakes(countMistakes, setResultData);
      setCorrectChars(correctChars, setResultData);
    }
  };

  const handleNextLetter = () => {
    setCurrentLetterIndex((prevIndex) => prevIndex + 1);
    setLetterStates((prevData) => ({
      ...prevData,
      [currentWordIndex]: {
        ...prevData[currentWordIndex],
        [currentLetterIndex]: "correct",
      },
    }));
  };

  const handleMisstake = () => {
    setCurrentLetterIndex((prevIndex) => prevIndex + 1);
    setLetterStates((prevData) => ({
      ...prevData,
      [currentWordIndex]: {
        ...prevData[currentWordIndex],
        [currentLetterIndex]: "incorrect",
      },
    }));
  };

  const handleBackSpacePressed = () => {
    if (currentLetterIndex === 0) {
      if (currentWordIndex > 0) {
        // backspacing only words which has mistake(s)
        if (
          Object.values(letterStates[currentWordIndex - 1]).includes(
            "incorrect"
          )
        ) {
          setCurrentWordIndex((prevIndex) => Math.max(prevIndex - 1, 0));

          const prevLetterIndex = Object.keys(
            letterStates[currentWordIndex - 1] || {}
          ).length;

          setCurrentLetterIndex(prevLetterIndex);
        }
      }
    } else {
      setCurrentLetterIndex((prevIndex) => Math.max(prevIndex - 1, 0));

      const prevLetterIndex = Math.max(currentLetterIndex - 1, 0);

      setLetterStates((prevData) => ({
        ...prevData,
        [currentWordIndex]: {
          ...(prevData[currentWordIndex] || {}),
          [prevLetterIndex]: "base",
        },
      }));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        containerRef.current &&
        containerRef.current.contains(event.target as Node)
      ) {
        const checkedStatus: string = checkLetter(
          event.key,
          wordsList,
          currentWordIndex,
          currentLetterIndex
        );
        if (checkedStatus && checkedStatus !== "SkipKey") {
          setGameSettings((prevData) => ({
            ...prevData,
            isGameStarted: true,
            isTimeOut: false,
          }));
        }
        switch (checkedStatus) {
          case "GameCompleted":
            break;
          case "BackspacePressed":
            handleBackSpacePressed();
            break;
          case "NextWord":
            handleNextWord();
            break;
          case "NextLetter":
            handleNextLetter();
            break;
          case "MistakeInLetter":
            handleMisstake();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    containerRef,
    isGameStarted,
    currentWordIndex,
    currentLetterIndex,
    handleNextWord,
    handleNextLetter,
    handleMisstake,
    handleBackSpacePressed,
    setGameSettings,
    letterStates,
    wordsList,
  ]);

  return null;
};

export default KeyboardHandler;

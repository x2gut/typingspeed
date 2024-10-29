import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import checkLetter from "../../utils/checkLetter";
import {
  setCorrectChars,
  setMistakes,
  setWordsAmount,
} from "../../utils/resultUtil";
import { GameSettings, LetterStates, ResultData } from "../../types/types";
import { useTypeSettings } from "../../contexts/TypeSettingsContext";
import { playAudio } from "../../utils/playAudio";
import { useNotice } from "../../contexts/NoticeContext";

interface KeyboardHandlerProps {
  resultData: ResultData;
  containerRef: React.RefObject<HTMLDivElement>;
  isGameStarted: boolean;
  currentWordIndex: number;
  currentLetterIndex: number;
  setCurrentWordIndex: Dispatch<SetStateAction<number>>;
  setCurrentLetterIndex: Dispatch<SetStateAction<number>>;
  setGameSettings: Dispatch<SetStateAction<GameSettings>>;
  setResultData: Dispatch<SetStateAction<ResultData>>;
  wordsList: string[];
}

const KeyboardHandler: React.FC<KeyboardHandlerProps> = ({
  resultData,
  containerRef,
  isGameStarted,
  currentWordIndex,
  currentLetterIndex,
  setCurrentWordIndex,
  setCurrentLetterIndex,
  setGameSettings,
  wordsList,
  setResultData,
}) => {
  const { typeSettings } = useTypeSettings();
  const { showNotice } = useNotice();

  const handleNextWord = () => {
    setCurrentWordIndex((prevIndex) => prevIndex + 1);
    setCurrentLetterIndex(0);

    const countMistakes = Object.values(
      resultData.letterStates[currentWordIndex]
    ).filter((value) => value === "incorrect").length;

    const correctChars =
      Object.values(resultData.letterStates[currentWordIndex]).length -
      countMistakes;

    const isLengthMatch =
      wordsList[currentWordIndex].length ===
      Object.keys(resultData.letterStates[currentWordIndex]).length;

    if (countMistakes === 0 && isLengthMatch) {
      setWordsAmount(setResultData);
    }

    setMistakes(countMistakes, setResultData);
    setCorrectChars(correctChars, setResultData);

    setResultData((prevData) => ({
      ...prevData,
      wordsTyped: [...prevData.wordsTyped, wordsList[currentWordIndex]],
    }));
  };

  const handleNextLetter = () => {
    setCurrentLetterIndex((prevIndex) => prevIndex + 1);
    setResultData((prevData) => ({
      ...prevData,
      letterStates: {
        ...prevData.letterStates,
        [currentWordIndex]: {
          ...prevData.letterStates[currentWordIndex],
          [currentLetterIndex]: "correct",
        },
      },
    }));
  };

  const handleMisstake = () => {
    setCurrentLetterIndex((prevIndex) => prevIndex + 1);
    setResultData((prevData) => ({
      ...prevData,
      letterStates: {
        ...prevData.letterStates,
        [currentWordIndex]: {
          ...prevData.letterStates[currentWordIndex],
          [currentLetterIndex]: "incorrect",
        },
      },
    }));
  };

  const handleBackSpacePressed = () => {
    const isAtStartOfWord = currentLetterIndex === 0;
    const hasPreviousWord = currentWordIndex > 0;

    if (isAtStartOfWord && hasPreviousWord) {
      handleBackspacingPreviousWord();
    } else {
      handleBackspacingCurrentLetter();
    }
  };

  const handleBackspacingPreviousWord = () => {
    const previousWordIndex = currentWordIndex - 1;
    const previousLetterStates =
      resultData.letterStates[previousWordIndex] || {};
    const isPreviousWordIncomplete =
      Object.values(previousLetterStates).includes("incorrect") ||
      wordsList[previousWordIndex].length !==
        Object.keys(previousLetterStates).length;

    if (isPreviousWordIncomplete) {
      setCurrentWordIndex(previousWordIndex);
      setCurrentLetterIndex(Object.keys(previousLetterStates).length);
      updateWordsTyped(previousWordIndex);
    }
  };

  const handleBackspacingCurrentLetter = () => {
    const prevLetterIndex = Math.max(currentLetterIndex - 1, 0);
    setCurrentLetterIndex(prevLetterIndex);

    setResultData((prevData) => ({
      ...prevData,
      letterStates: {
        ...prevData.letterStates,
        [currentWordIndex]: {
          ...(prevData.letterStates[currentWordIndex] || {}),
          [prevLetterIndex]: "base",
        },
      },
    }));
  };

  const updateWordsTyped = (indexToRemove: number) => {
    setResultData((prevData) => ({
      ...prevData,
      wordsTyped: prevData.wordsTyped.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.getModifierState("CapsLock")) {
        showNotice("CapsLock is ON", "info", 3500);
      }
      if (
        containerRef.current &&
        containerRef.current.contains(event.target as Node)
      ) {
        const sound = typeSettings.soundOnPress;
        if (typeSettings.soundOnPress && typeof sound === "string") {
          if (event.key === " ") {
            playAudio("Space", sound);
          } else if (event.key === "Backspace") {
            playAudio("BackSpace", sound);
          } else {
            playAudio("Main", sound);
          }
        }
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
    wordsList,
  ]);

  return null;
};

export default KeyboardHandler;

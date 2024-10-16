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
import { BsCapslock } from "react-icons/bs";

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
    console.log(resultData.wordsTyped);
    setCurrentWordIndex((prevIndex) => prevIndex + 1);
    setCurrentLetterIndex(0);

    const countMistakes = Object.values(
      resultData.letterStates[currentWordIndex]
    ).filter((value) => value === "incorrect").length;

    const correctChars =
      Object.values(resultData.letterStates[currentWordIndex]).length -
      countMistakes;

    if (countMistakes === 0) {
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
    if (currentLetterIndex === 0) {
      if (currentWordIndex > 0) {
        // backspacing only words which has mistake(s)
        if (
          Object.values(resultData.letterStates[currentWordIndex - 1]).includes(
            "incorrect"
          )
        ) {
          setCurrentWordIndex((prevIndex) => Math.max(prevIndex - 1, 0));

          const prevLetterIndex = Object.keys(
            resultData.letterStates[currentWordIndex - 1] || {}
          ).length;

          setCurrentLetterIndex(prevLetterIndex);
        }

        setResultData((prevData) => ({
          ...prevData,
          wordsTyped: prevData.wordsTyped.filter(
            (_, index) => index !== Math.max(currentWordIndex - 1, 0)
          ),
        }));
      }
    } else {
      setCurrentLetterIndex((prevIndex) => Math.max(prevIndex - 1, 0));

      const prevLetterIndex = Math.max(currentLetterIndex - 1, 0);
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
    }
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
        if (typeSettings.soundOnPress) {
          const sound = typeSettings.soundOnPress;
          if (event.key === " ") {
            playAudio(`/typingspeed/assets/sounds/${sound}_space_soundmp3.mp3`);
          } else if (event.key === "Backspace") {
            playAudio(
              `/typingspeed/assets/sounds/${sound}_backspace_soundmp3.mp3`
            );
          } else {
            playAudio(`/typingspeed/assets/sounds/${sound}_main_soundmp3.mp3`);
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

import React, { Dispatch, SetStateAction, useEffect } from "react";
import checkLetter from "../../utils/checkLetter";
import { ResultData } from "../../types/types";
import { playAudio } from "../../utils/playAudio";
import { useNoticeStore } from "../../store/notification-store";
import useSettingsStore from "../../store/settings-store";
import useResultStore from "../../store/result-store";

interface KeyboardHandlerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  isGameStarted: boolean;
  currentWordIndex: number;
  currentLetterIndex: number;
  setCurrentWordIndex: Dispatch<SetStateAction<number>>;
  setCurrentLetterIndex: Dispatch<SetStateAction<number>>;
  wordsList: string[];
}

const KeyboardHandler: React.FC<KeyboardHandlerProps> = ({
  containerRef,
  isGameStarted,
  currentWordIndex,
  currentLetterIndex,
  setCurrentWordIndex,
  setCurrentLetterIndex,
  wordsList,
}) => {
  const { gameSettings, setTypeSettings } = useSettingsStore();
  const showNotice = useNoticeStore((state) => state.showNotice);
  const { userResults, setUserResults } = useResultStore();

  const handleNextWord = () => {
    setCurrentWordIndex((prevIndex) => prevIndex + 1);
    setCurrentLetterIndex(0);

    const countMistakes = Object.values(
      userResults.letterStates[currentWordIndex]
    ).filter((value) => value === "incorrect").length;

    const correctChars =
      Object.values(userResults.letterStates[currentWordIndex]).length -
      countMistakes;

    const isLengthMatch =
      wordsList[currentWordIndex].length ===
      Object.keys(userResults.letterStates[currentWordIndex]).length;

    if (countMistakes === 0 && isLengthMatch) {
      setUserResults({ wordsAmount: userResults.wordsAmount + 1 });
    }

    setUserResults({ mistakes: userResults.mistakes + countMistakes });
    setUserResults({ correctChars: userResults.correctChars + correctChars });

    setUserResults({ wordsTyped: [...userResults.wordsTyped, wordsList[currentWordIndex]] });
  };

  const handleNextLetter = () => {
    setCurrentLetterIndex((prevIndex) => prevIndex + 1);
    setUserResults({allCharsTyped: [...userResults.allCharsTyped, wordsList[currentWordIndex][currentLetterIndex]]})
    setUserResults({
      letterStates: {
        ...userResults.letterStates,
        [currentWordIndex]: {
          ...userResults.letterStates[currentWordIndex],
          [currentLetterIndex]: "correct",
        },
      },
    });
  };

  const handleMisstake = () => {
    setCurrentLetterIndex((prevIndex) => prevIndex + 1);
    setUserResults({
      allCharsTyped: [...userResults.allCharsTyped, wordsList[currentWordIndex][currentLetterIndex]],
      letterStates: {
        ...userResults.letterStates,
        [currentWordIndex]: {
          ...userResults.letterStates[currentWordIndex],
          [currentLetterIndex]: "incorrect",
        },
      },
    })
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
      userResults.letterStates[previousWordIndex] || {};
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

    setUserResults({
      letterStates: {
        ...userResults.letterStates,
        [currentWordIndex]: {
          ...(userResults.letterStates[currentWordIndex] || {}),
          [prevLetterIndex]: "base",
        },
      },
    });
  };

  const updateWordsTyped = (indexToRemove: number) => {
    setUserResults({
      wordsTyped: userResults.wordsTyped.filter(
        (_, index) => index !== indexToRemove
      ),
    });
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
        const sound = gameSettings.soundOnPress;
        if (gameSettings.soundOnPress && typeof sound === "string") {
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
          setTypeSettings({ isGameStarted: true, isTimeOut: false });
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
    wordsList,
  ]);

  return null;
};

export default KeyboardHandler;

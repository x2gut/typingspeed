import React, { useEffect, useState } from "react";
import { LetterStates } from "../../types/types";
import useSettingsStore from "../../store/settings-store";
import useResultStore from "../../store/result-store";

interface WordProps {
  word: string;
  currentWordIndex: number;
  currentLetterIndex: number;
  wordIndex: number;
  isGameStarted: boolean;
}

const Word: React.FC<WordProps> = React.memo(
  ({
    word,
    currentWordIndex,
    currentLetterIndex,
    wordIndex,
    isGameStarted,
  }) => {
    const { gameSettings } = useSettingsStore();
    const { userResults } = useResultStore();
    const { letterStates } = userResults;
    const [wordsState, setWordsState] = useState<{
      [wordIndex: number]: string;
    }>({});

    useEffect(() => {
      const resetWordsState = () => setWordsState({});

      const getWordState = () => {
        if (wordIndex >= currentWordIndex) return "";

        const hasMistake =
          letterStates[wordIndex] &&
          Object.values(letterStates[wordIndex]).includes("incorrect");

        const isIncomplete =
          letterStates[wordIndex] &&
          Object.keys(letterStates[wordIndex]).length !== word.length;

        return hasMistake || isIncomplete ? "word-error" : "";
      };

      if (!isGameStarted) {
        resetWordsState();
      } else {
        setWordsState((prevState) => ({
          ...prevState,
          [wordIndex]: getWordState(),
        }));
      }
    }, [isGameStarted, letterStates, currentWordIndex]);

    return (
      <div
        className={`word m-2 font-normal ${wordsState[wordIndex]} ${
          wordIndex === currentWordIndex ? "relative" : ""
        }`}
        key={wordIndex}
      >
        {word.split("").map((letter, letterIndex) => (
          <span
            className={`text-3xl ${
              letterStates[wordIndex]?.[letterIndex] === "correct"
                ? "correct"
                : letterStates[wordIndex]?.[letterIndex] === "incorrect"
                ? "incorrect"
                : "base"
            }`}
            key={letterIndex}
          >
            {letter}
          </span>
        ))}
        {gameSettings.caretType && currentWordIndex === wordIndex && (
          <div
            className={`caret-${gameSettings.caretType} ${
              gameSettings.caretRainbow && "caret-rainbow"
            }`}
            style={{
              transform: `translate(${currentLetterIndex * 16.5}px)`,
            }}
          ></div>
        )}
      </div>
    );
  }
);

export default Word;

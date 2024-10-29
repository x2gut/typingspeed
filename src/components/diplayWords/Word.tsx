import React, { useEffect, useState } from "react";
import { LetterStates } from "../../types/types";
import { useTypeSettings } from "../../contexts/TypeSettingsContext";

interface WordProps {
  word: string;
  currentWordIndex: number;
  currentLetterIndex: number;
  wordIndex: number;
  letterStates: LetterStates;
  isGameStarted: boolean;
}

const Word: React.FC<WordProps> = React.memo(
  ({
    word,
    currentWordIndex,
    currentLetterIndex,
    wordIndex,
    letterStates,
    isGameStarted,
  }) => {
    const { typeSettings } = useTypeSettings();
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
        {typeSettings.caretType && currentWordIndex === wordIndex && (
          <div
            className={`caret-${typeSettings.caretType} ${
              typeSettings.caretRainbow && "caret-rainbow"
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

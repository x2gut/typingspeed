import React, { useEffect } from "react";
import { LetterStates } from "../../types/types";
import { useTypeSettings } from "../../contexts/TypeSettingsContext";

interface WordProps {
  word: string;
  currentWordIndex: number;
  currentLetterIndex: number;
  wordIndex: number;
  letterStates: LetterStates;
}

const Word: React.FC<WordProps> = ({
  word,
  currentWordIndex,
  currentLetterIndex,
  wordIndex,
  letterStates,
}) => {
  const { typeSettings } = useTypeSettings();

  return (
    <div
      className={`word m-2 ${wordIndex === currentWordIndex ? "relative" : ""}`}
      key={wordIndex}
    >
      {word.split("").map((letter, letterIndex) => (
        <span
          className={`letter ${
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
      {typeSettings.caretType !== false && currentWordIndex === wordIndex && (
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
};

export default Word;

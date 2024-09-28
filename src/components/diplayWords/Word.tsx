import React, { useEffect } from "react";
import { LetterStates } from "../../types/types";

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
      {currentWordIndex === wordIndex && (
        <div
          className="caret"
          style={{
            transform: `translate(${currentLetterIndex * 16.5}px)`,
          }}
        ></div>
      )}
    </div>
  );
};

export default Word;

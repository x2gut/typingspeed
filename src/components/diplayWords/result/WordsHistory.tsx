import React, { memo } from "react";
import { LetterStates } from "../../../types/types";
import { MdHistory } from "react-icons/md";

interface WordsHistoryProps {
  wordsTyped: string[];
  letterStates: LetterStates;
}

const WordsHistory: React.FC<WordsHistoryProps> = ({
  wordsTyped,
  letterStates,
}) => {
  return (
    <div className="words-history px-[110px] flex flex-col">
      <div className="words-history-title flex gap-1 items-center text-lg">
        <MdHistory />
        <h3>words history</h3>
      </div>
      <div className="words flex flex-wrap max-h-[120px] overflow-y-scroll overflow-x-hidden">
        {wordsTyped.map((word, wordIndex) => {
          return (
            <div key={wordIndex} className="mx-2">
              {word.split("").map((letter, letterIndex) => {
                return (
                  <span
                    className={`text-xl ${
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
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(WordsHistory);

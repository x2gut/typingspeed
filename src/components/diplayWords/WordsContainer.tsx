import { useState } from "react";
import useSettingsStore from "../../store/settings-store";
import Word from "./Word";

interface WordsContainerProps {
  wordsContainerRef: React.RefObject<HTMLDivElement>;
  currentWords: string[][]
  currentWordIndex: number;
  currentLetterIndex: number;
  shuffledWords: string[]
}

const WordsContainer: React.FC<WordsContainerProps> = ({
  wordsContainerRef,
  currentWords,
  currentWordIndex,
  currentLetterIndex,
  shuffledWords
}) => {
  const { typeSettings, setTypeSettings } = useSettingsStore();


  return (
    <div
      className={`flex h-52 w-full max-w-[1280px] justify-center flex-wrap p-7 outline-none ${
        !typeSettings.isFocused ? "blur opacity-40" : ""
      }`}
      ref={wordsContainerRef}
      tabIndex={1}
      onFocus={() => setTypeSettings({ isFocused: true })}
      onBlur={() => setTypeSettings({ isFocused: false })}
    >
      <div className="words">
        {currentWords.map((row, rowIndex) => (
          <div className="word-row flex gap-2" key={rowIndex}>
            {row.map((word, wordIndex) => (
              <Word
                key={wordIndex}
                word={word}
                currentWordIndex={currentWordIndex}
                currentLetterIndex={currentLetterIndex}
                wordIndex={shuffledWords.indexOf(word)}
                isGameStarted={typeSettings.isGameStarted}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordsContainer;

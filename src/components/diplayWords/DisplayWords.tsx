import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import Word from "./Word";
import Timer from "./Timer";
import KeyboardHandler from "./KeyboardHandler";
import restartTyping from "../../utils/restartTyping";
import shuffleArray from "../../helpers/shuffleArray";
import BlurWarning from "./BlurWarning";
import getAvgWordLength from "../../helpers/getAvgWordLength";
import WordsCountdown from "./WordsCountdown";
import useContainerDimensions from "../../hooks/useContainerDimensions";
import { getCurrentSlice } from "../../utils/getCurrentSlice";
import LanguageBtn from "./LanguageBtn";
import LanguageSelectModal from "../../modals/languageSelectModal";
import useSettingsStore from "../../store/settings-store";
import useResultStore from "../../store/result-store";

interface DisplayWordsProps {
  wordsList: string[];
  isResetData: boolean;
}

const DisplayWords: React.FC<DisplayWordsProps> = ({
  wordsList,
  isResetData,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const { gameSettings, typeSettings, setTypeSettings } = useSettingsStore();
  const [isLangModalActive, setIsLangModalActive] = useState<boolean>(false);
  const [shuffledWords, setShuffledWords] = useState(wordsList);
  const [avgWordsLength, setAvgWordsLength] = useState<number>(0);
  const [currentWords, setCurrentWords] = useState<string[][]>([]);
  const {resetUserResults} = useResultStore();
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const { wordsPerContainer, slicedIndex, setSlicedIndex } =
    useContainerDimensions(
      wordsContainerRef,
      typeSettings.isTimeOut,
      shuffledWords
    );

  useEffect(() => {
    if (wordsContainerRef.current) {
      setCurrentWords(
        getCurrentSlice(
          shuffledWords,
          slicedIndex,
          wordsContainerRef.current.offsetWidth - 56
        )
      );
    }
  }, [slicedIndex]);

  useEffect(() => {
    setAvgWordsLength(getAvgWordLength(shuffledWords));
    resetGame();
    resetUserResults();
  }, [
    gameSettings.mode,
    gameSettings.words,
    typeSettings.time,
    wordsList,
    isResetData,
  ]);

  const resetGame = () => {
    restartTyping(
      setCurrentWordIndex,
      setCurrentLetterIndex,
      setSlicedIndex,
      wordsPerContainer
    );
    const shuffled = shuffleArray(wordsList);
    setShuffledWords(shuffled);
    getAvgWordLength(shuffled);
    setTypeSettings({ isTimeOut: false, isGameStarted: false });
    wordsContainerRef.current && wordsContainerRef.current.focus();
  };

  // Handles the transition to the next row of words.
  // If the user entered the last word in the second row,
  // update the slice indices to move to the next set of words.
  useEffect(() => {
    const hasCurrentWords = currentWords[0] && currentWords[1];

    if (hasCurrentWords) {
      const lastWordInSecondRow = currentWords[1][currentWords[1].length - 1];
      const lastWordIndexInSecondRow =
        shuffledWords.indexOf(lastWordInSecondRow);
      const isIndexMatch = currentWordIndex - 1 === lastWordIndexInSecondRow;

      if (isIndexMatch && slicedIndex.endIndex < shuffledWords.length) {
        setSlicedIndex((prev) => ({
          startIndex: prev.startIndex + currentWords[0].length,
          endIndex: prev.endIndex + currentWords[0].length,
        }));
      }
    }
  }, [currentWordIndex]);

  return (
    <>
      <LanguageSelectModal
        resetGame={() => resetGame()}
        isActive={isLangModalActive}
        setIsActive={setIsLangModalActive}
      />
      {typeSettings.isGameStarted && gameSettings.mode === "time" ? (
        <Timer
          isGameStarted={typeSettings.isGameStarted}
          avgWordLength={avgWordsLength}
          callback={() => {
            resetGame();
            setTypeSettings({ isTimeOut: true });
          }}
        />
      ) : (
        typeSettings.isGameStarted && (
          <WordsCountdown
            totalWords={gameSettings.words}
            isGameStarted={typeSettings.isGameStarted}
            avgWordLength={avgWordsLength}
            callback={() => {
              resetGame();
              setTypeSettings({ isTimeOut: true });
            }}
          />
        )
      )}
      {!typeSettings.isGameStarted && (
        <LanguageBtn
          isModalActive={isLangModalActive}
          setIsModalActive={setIsLangModalActive}
        />
      )}
      <div
        className={`words-container flex h-52 w-full max-w-[1280px] justify-center flex-wrap p-7 outline-none ${
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
      <div
        className={`blur-warning ${
          typeSettings.isFocused ? "hidden" : "visible"
        } absolute bottom-1/2 -translate-y-10 z-10`}
        onClick={() => wordsContainerRef.current?.focus()}
      >
        <BlurWarning />
      </div>
      {wordsContainerRef.current && (
        <KeyboardHandler
          containerRef={wordsContainerRef}
          isGameStarted={typeSettings.isGameStarted}
          currentWordIndex={currentWordIndex}
          currentLetterIndex={currentLetterIndex}
          setCurrentWordIndex={setCurrentWordIndex}
          setCurrentLetterIndex={setCurrentLetterIndex}
          wordsList={shuffledWords}
        />
      )}
    </>
  );
};

export default DisplayWords;

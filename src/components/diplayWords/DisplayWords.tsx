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
import RestartButton from "./RestartButton";
import restartTyping from "../../utils/restartTyping";
import Result from "./Result";
import shuffleArray from "../../helpers/shuffleArray";
import BlurWarning from "./BlurWarning";
import { GameSettings, LetterStates, ResultData } from "../../types/types";
import getAvgWordLength from "../../helpers/getAvgWordLength";
import { useTypeSettings } from "../../contexts/TypeSettingsContext";
import WordsCountdown from "./WordsCountdown";
import useContainerDimensions from "../../hooks/useContainerDimensions";
import useResultData from "../../hooks/useResultData";
import Keyboard from "./responsiveKeyboard/Keyboard";
import { getCurrentSlice } from "../../utils/getCurrentSlice";
import LanguageBtn from "./LanguageBtn";
import LanguageSelectModal from "../../modals/languageSelectModal";

interface DisplayWordsProps {
  wordsList: string[];
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  setCurrentLang: Dispatch<SetStateAction<string>>;
}

const DisplayWords: React.FC<DisplayWordsProps> = ({
  wordsList,
  setIsFocused,
  setCurrentLang,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [letterStates, setLetterStates] = useState<LetterStates>({});
  const { typeSettings } = useTypeSettings();
  const [isLangModalActive, setIsLangModalActive] = useState<boolean>(false);
  const [shuffledWords, setShuffledWords] = useState(wordsList);
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    isFocused: false,
    isGameStarted: false,
    isTimeOut: false,
    time: typeSettings.time,
  });
  const [avgWordsLength, setAvgWordsLength] = useState<number>(0);
  const [currentWords, setCurrentWords] = useState<string[][]>([]);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const { resultData, setResultData, resetResultData } = useResultData();
  const { wordsPerContainer, slicedIndex, setSlicedIndex, wordsPerRow } =
    useContainerDimensions(
      wordsContainerRef,
      gameSettings.isTimeOut,
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
    const shuffled = shuffleArray(wordsList);
    console.log(currentWords);
    setShuffledWords(shuffled);
    setAvgWordsLength(getAvgWordLength(shuffled));
    resetGame();
  }, [wordsList]);

  useEffect(() => {
    setCurrentLang(typeSettings.lang);
  }, [typeSettings.lang]);

  useEffect(() => {
    setAvgWordsLength(getAvgWordLength(shuffledWords));
    resetGame();
  }, [typeSettings.mode, typeSettings.words, typeSettings.time]);

  useEffect(() => {
    setIsFocused(gameSettings.isFocused);
  }, [gameSettings.isFocused]);

  const resetGame = () => {
    restartTyping(
      setCurrentWordIndex,
      setCurrentLetterIndex,
      setLetterStates,
      setSlicedIndex,
      wordsPerContainer
    );
    const shuffled = shuffleArray(wordsList);
    getAvgWordLength(shuffled);
    setGameSettings((prevSettings) => ({
      ...prevSettings,
      isTimeOut: false,
      isGameStarted: false,
    }));
    setSlicedIndex({ startIndex: 0, endIndex: 30 });
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
      {gameSettings.isTimeOut ? (
        <Result resultData={resultData} avgWordLength={avgWordsLength} />
      ) : (
        <>
          {gameSettings.isGameStarted && typeSettings.mode === "time" ? (
            <Timer
              isGameStarted={gameSettings.isGameStarted}
              remainingTime={typeSettings.time}
              resultData={resultData}
              setResultData={setResultData}
              avgWordLength={avgWordsLength}
              callback={() => {
                resetGame();
                setGameSettings((prevSettings) => ({
                  ...prevSettings,
                  isTimeOut: true,
                }));
              }}
            />
          ) : (
            gameSettings.isGameStarted && (
              <WordsCountdown
                totalWords={typeSettings.words}
                currentWordsAmount={resultData.wordsAmount}
                isGameStarted={gameSettings.isGameStarted}
                resultData={resultData}
                avgWordLength={avgWordsLength}
                setResultData={setResultData}
                setGameSettings={setGameSettings}
                callback={() => {
                  resetGame();
                  setGameSettings((prevSettings) => ({
                    ...prevSettings,
                    isTimeOut: true,
                  }));
                }}
              />
            )
          )}
          {!gameSettings.isGameStarted && (
            <LanguageBtn
              isModalActive={isLangModalActive}
              setIsModalActive={setIsLangModalActive}
            />
          )}
          <LanguageSelectModal
            callback={() => resetGame()}
            isActive={isLangModalActive}
            setIsActive={setIsLangModalActive}
          />
          <div
            className={`words-container flex h-52 w-full justify-center flex-wrap p-7 outline-none ${
              !gameSettings.isFocused ? "blur opacity-40" : ""
            }`}
            ref={wordsContainerRef}
            tabIndex={1}
            onFocus={() =>
              setGameSettings((prevSettings) => ({
                ...prevSettings,
                isFocused: true,
              }))
            }
            onBlur={() =>
              setGameSettings((prevSettings) => ({
                ...prevSettings,
                isFocused: false,
              }))
            }
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
                      letterStates={letterStates}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div
            className={`blur-warning ${
              gameSettings.isFocused ? "hidden" : "visible"
            } absolute bottom-1/2 -translate-y-10`}
            onClick={() => wordsContainerRef.current?.focus()}
          >
            <BlurWarning />
          </div>
          {wordsContainerRef.current && (
            <KeyboardHandler
              containerRef={wordsContainerRef}
              isGameStarted={gameSettings.isGameStarted}
              currentWordIndex={currentWordIndex}
              currentLetterIndex={currentLetterIndex}
              setCurrentWordIndex={setCurrentWordIndex}
              setCurrentLetterIndex={setCurrentLetterIndex}
              setLetterStates={setLetterStates}
              setSlicedIndex={setSlicedIndex}
              wordsPerContainer={30}
              slicedIndex={slicedIndex}
              setGameSettings={setGameSettings}
              letterStates={letterStates}
              wordsList={shuffledWords}
              setResultData={setResultData}
            />
          )}
        </>
      )}
      {typeSettings.keyboard.show && !gameSettings.isTimeOut && (
        <Keyboard
          isFocused={gameSettings.isFocused}
          isResponsive={typeSettings.keyboard.responsive}
        />
      )}
      <RestartButton
        onClick={() => {
          resetGame();
          setGameSettings((prevSettings) => ({
            ...prevSettings,
            isTimeOut: false,
          }));
          resetResultData();
        }}
      />
    </>
  );
};

export default DisplayWords;

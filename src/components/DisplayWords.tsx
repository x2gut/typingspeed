import React, { useState, useRef, useEffect } from "react";
import Word from "./Word";
import Timer from "./Timer";
import KeyboardHandler from "./KeyboardHandler";
import RestartButton from "./RestartButton";
import restartTyping from "../utils/restartTyping";
import Result from "./Result";
import shuffleArray from "../helpers/shuffleArray";
import BlurWarning from "./BlurWarning";
import { LetterStates, ResultData } from "../types/types";
import getAvgWordLength from "../helpers/getAvgWordLength";
import { useTypeSettings } from "../contexts/TypeSettingsContext";
import WordsCountdown from "./WordsCountdown";

interface DisplayWordsProps {
  wordsList: string[];
}

const DisplayWords: React.FC<DisplayWordsProps> = ({ wordsList }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [letterStates, setLetterStates] = useState<LetterStates>({});

  const [slicedIndex, setSlicedIndex] = useState({
    startIndex: 0,
    endIndex: 0,
  });
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [wordsPerContainer, setWordsPerContainer] = useState<number>(0);
  const { typeSettings, setTypeSettings } = useTypeSettings();
  const [time, setTime] = useState(typeSettings.time);
  const [shuffledWords, setShuffledWords] = useState(wordsList);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const [resultData, setResultData] = useState<ResultData>({
    wordsPerMin: [],
    mistakes: 0,
    totalChars: 0,
    wordsAmount: 0,
    mistakesPerMin: []
  });
  const [avgWordsLength, setAvgWordsLength] = useState<number>(0);

  const resetResultData = () => {
    setResultData({
      wordsPerMin: [],
      mistakes: 0,
      totalChars: 0,
      wordsAmount: 0,
      mistakesPerMin: []
    });
  };

  useEffect(() => {
    setShuffledWords(shuffleArray(wordsList));
    const averageWordLength = getAvgWordLength(shuffledWords);
    setAvgWordsLength(averageWordLength);
    handleEndGame();
    resetResultData();
    setIsTimeOut(false)
    setTime(typeSettings.time)
  }, [typeSettings.mode, typeSettings.words, typeSettings.time]);

  useEffect(() => {
    if (wordsContainerRef.current) {
      const containerWidth = wordsContainerRef.current.offsetWidth;
      const containerHeight = wordsContainerRef.current.offsetHeight;
      const avgWordWidth = 100;
      const avgWordHeight = 16.5 + 16 + 28;
      const wordsAmountPerLine = Math.floor(containerWidth / avgWordWidth);
      const LinesAmount = Math.floor(containerHeight / avgWordHeight);
      const wordsPerContainer = wordsAmountPerLine * LinesAmount;
      setWordsPerContainer(wordsPerContainer);
      setSlicedIndex({ ...slicedIndex, endIndex: wordsPerContainer });
    }
  }, [isTimeOut]);

  const handleEndGame = () => {
    restartTyping(
      setCurrentWordIndex,
      setCurrentLetterIndex,
      setLetterStates,
      setSlicedIndex,
      wordsPerContainer
    );
    setIsGameStarted(false);
    setShuffledWords(shuffleArray(wordsList));
  };

  return (
    <>
      {isTimeOut ? (
        <Result resultData={resultData} totalTime={time} />
      ) : (
        <>
          {typeSettings.mode === "time" ? (
            <Timer
              isGameStarted={isGameStarted}
              remainingTime={typeSettings.time}
              resultData={resultData}
              setResultData={setResultData}
              avgWordsLength={avgWordsLength}
              callback={() => {
                handleEndGame();
                setIsTimeOut(true);
              }}
            />
          ) : (
            <WordsCountdown
              totalWords={typeSettings.words}
              currentWordsAmount={resultData.wordsAmount}
              isGameStarted={isGameStarted}
              resultData={resultData}
              setResultData={setResultData}
              setTime={setTime}
              callback={() => {
                handleEndGame();
                setIsTimeOut(true);
              }}
            />
          )}
          <div
            className={`blur-warning ${
              isFocused ? "hidden" : "visible"
            } absolute`}
          >
            <BlurWarning />
          </div>
          <div
            className={`words-container flex gap-4 max-w-7xl max-h-60 h-full w-full min-h-52 flex-wrap p-7 justify-center outline-none ${
              !isFocused ? "blur opacity-40" : ""
            }`}
            ref={wordsContainerRef}
            tabIndex={0}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {shuffledWords
              .slice(slicedIndex.startIndex, slicedIndex.endIndex)
              .map((word: string, wordIndex: number) => (
                <Word
                  key={wordIndex}
                  word={word}
                  currentWordIndex={currentWordIndex}
                  currentLetterIndex={currentLetterIndex}
                  wordIndex={wordIndex + slicedIndex.startIndex}
                  letterStates={letterStates}
                />
              ))}
          </div>
          {wordsContainerRef.current && (
            <KeyboardHandler
              containerRef={wordsContainerRef}
              isGameStarted={isGameStarted}
              currentWordIndex={currentWordIndex}
              currentLetterIndex={currentLetterIndex}
              setCurrentWordIndex={setCurrentWordIndex}
              setCurrentLetterIndex={setCurrentLetterIndex}
              setLetterStates={setLetterStates}
              setSlicedIndex={setSlicedIndex}
              wordsPerContainer={wordsPerContainer}
              slicedIndex={slicedIndex}
              setIsGameStarted={setIsGameStarted}
              setIsTimeOut={setIsTimeOut}
              letterStates={letterStates}
              wordsList={wordsList}
              setResultData={setResultData}
            />
          )}
        </>
      )}
      <RestartButton
        onClick={() => {
          handleEndGame();
          setIsTimeOut(false);
          resetResultData();
        }}
      />
    </>
  );
};

export default DisplayWords;

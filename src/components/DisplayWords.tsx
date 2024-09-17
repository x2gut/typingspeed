import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import Word from "./Word";
import Timer from "./Timer";
import KeyboardHandler from "./KeyboardHandler";
import RestartButton from "./RestartButton";
import restartTyping from "../utils/restartTyping";
import Result from "./Result";
import shuffleArray from "../helpers/shuffleArray";
import BlurWarning from "./BlurWarning";
import { GameSettings, LetterStates, ResultData } from "../types/types";
import getAvgWordLength from "../helpers/getAvgWordLength";
import { useTypeSettings } from "../contexts/TypeSettingsContext";
import WordsCountdown from "./WordsCountdown";
import useContainerDimensions from "./hooks/useContainerDimensions";
import useResultData from "./hooks/useResultData";

interface DisplayWordsProps {
  wordsList: string[];
  setIsGameStarted: Dispatch<SetStateAction<boolean>>
}

const DisplayWords: React.FC<DisplayWordsProps> = ({ wordsList, setIsGameStarted }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [letterStates, setLetterStates] = useState<LetterStates>({});
  const { typeSettings } = useTypeSettings();
  const [shuffledWords, setShuffledWords] = useState(wordsList);
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    isFocused: false,
    isGameStarted: false,
    isTimeOut: false,
    time: typeSettings.time,
  });
  const [avgWordsLength, setAvgWordsLength] = useState<number>(0);
  const wordsContainerRef = useRef<HTMLDivElement>(null);

  const { wordsPerContainer, slicedIndex, setSlicedIndex } =
    useContainerDimensions(wordsContainerRef, gameSettings.isTimeOut);
  const { resultData, setResultData, resetResultData } = useResultData();

  // Reset words container and result data
  useEffect(() => {
    setShuffledWords(shuffleArray(wordsList));
    const averageWordLength = getAvgWordLength(shuffledWords);
    setAvgWordsLength(averageWordLength);
    handleEndGame();
    resetResultData();
    setGameSettings((prevSettings) => ({
      ...prevSettings,
      isTimeOut: false,
      time: typeSettings.time,
    }));
  }, [typeSettings.mode, typeSettings.words, typeSettings.time]);

  useEffect(() => {
    setIsGameStarted(gameSettings.isGameStarted)
  }, [gameSettings.isGameStarted])

  const handleEndGame = () => {
    restartTyping(
      setCurrentWordIndex,
      setCurrentLetterIndex,
      setLetterStates,
      setSlicedIndex,
      wordsPerContainer
    );
    setGameSettings((prevSettings) => ({
      ...prevSettings,
      isTimeOut: false,
      isGameStarted: false,
    }));
    setShuffledWords(shuffleArray(wordsList));
  };

  return (
    <>
      {gameSettings.isTimeOut ? (
        <Result resultData={resultData} avgWordLength={avgWordsLength} />
      ) : (
        <>
          {typeSettings.mode === "time" ? (
            <Timer
              isGameStarted={gameSettings.isGameStarted}
              remainingTime={typeSettings.time}
              resultData={resultData}
              setResultData={setResultData}
              avgWordLength={avgWordsLength}
              callback={() => {
                handleEndGame();
                setGameSettings((prevSettings) => ({
                  ...prevSettings,
                  isTimeOut: true,
                }));
              }}
            />
          ) : (
            <WordsCountdown
              totalWords={typeSettings.words}
              currentWordsAmount={resultData.wordsAmount}
              isGameStarted={gameSettings.isGameStarted}
              resultData={resultData}
              avgWordLength={avgWordsLength}
              setResultData={setResultData}
              setGameSettings={setGameSettings}
              callback={() => {
                handleEndGame();
                setGameSettings((prevSettings) => ({
                  ...prevSettings,
                  isTimeOut: true,
                }));
              }}
            />
          )}
          <div
            className={`blur-warning ${
              gameSettings.isFocused ? "hidden" : "visible"
            } absolute`}
          >
            <BlurWarning />
          </div>
          <div
            className={`words-container flex gap-4 max-w-7xl max-h-60 h-full w-full min-h-52 flex-wrap p-7 justify-center outline-none ${
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
              isGameStarted={gameSettings.isGameStarted}
              currentWordIndex={currentWordIndex}
              currentLetterIndex={currentLetterIndex}
              setCurrentWordIndex={setCurrentWordIndex}
              setCurrentLetterIndex={setCurrentLetterIndex}
              setLetterStates={setLetterStates}
              setSlicedIndex={setSlicedIndex}
              wordsPerContainer={wordsPerContainer}
              slicedIndex={slicedIndex}
              setGameSettings={setGameSettings}
              letterStates={letterStates}
              wordsList={shuffledWords}
              setResultData={setResultData}
            />
          )}
        </>
      )}
      <RestartButton
        onClick={() => {
          handleEndGame();
          setGameSettings((prevSettings) => ({
            ...prevSettings,
            isTimeOut: false,
          }));
          resetResultData();
          if (wordsContainerRef.current) {
            wordsContainerRef.current.focus();
          }
        }}
      />
    </>
  );
};

export default DisplayWords;

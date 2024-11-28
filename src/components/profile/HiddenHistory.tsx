import { CiCalendarDate } from "react-icons/ci";
import { FiTarget } from "react-icons/fi";
import { IoTimeOutline } from "react-icons/io5";
import { MdLanguage, MdOutlineError } from "react-icons/md";
import { RiExpandUpDownLine } from "react-icons/ri";
import { TbHexagonLetterAFilled } from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";
import { FaLock } from "react-icons/fa";
import { useState } from "react";

const HiddenHistory = () => {
  const fakeHistoryData = [
    {
      wpm: 100,
      accuracy: 100,
      mistakes: 0,
      mode: "time",
      words: 20,
      time: 15,
      language: "english",
      date: "11-06-2024",
    },
    {
      wpm: 100,
      accuracy: 100,
      mistakes: 0,
      mode: "time",
      words: 20,
      time: 15,
      language: "english",
      date: "11-06-2024",
    },
    {
      wpm: 100,
      accuracy: 100,
      mistakes: 0,
      mode: "time",
      words: 20,
      time: 15,
      language: "english",
      date: "11-06-2024",
    },
    {
      wpm: 100,
      accuracy: 100,
      mistakes: 0,
      mode: "time",
      words: 20,
      time: 15,
      language: "english",
      date: "11-06-2024",
    },
    {
      wpm: 100,
      accuracy: 100,
      mistakes: 0,
      mode: "time",
      words: 20,
      time: 15,
      language: "english",
      date: "11-06-2024",
    },
    {
      wpm: 100,
      accuracy: 100,
      mistakes: 0,
      mode: "time",
      words: 20,
      time: 15,
      language: "english",
      date: "11-06-2024",
    },
    {
      wpm: 100,
      accuracy: 100,
      mistakes: 0,
      mode: "time",
      words: 20,
      time: 15,
      language: "english",
      date: "11-06-2024",
    },
    {
      wpm: 100,
      accuracy: 100,
      mistakes: 0,
      mode: "time",
      words: 20,
      time: 15,
      language: "english",
      date: "11-06-2024",
    },
    {
      wpm: 100,
      accuracy: 100,
      mistakes: 0,
      mode: "time",
      words: 20,
      time: 15,
      language: "english",
      date: "11-06-2024",
    },
    {
      wpm: 100,
      accuracy: 100,
      mistakes: 0,
      mode: "time",
      words: 20,
      time: 15,
      language: "english",
      date: "11-06-2024",
    },
  ];
  return (
    <div
      className="history mt-5 mb-5 flex flex-col items-center relative"
    >
      <div
        className={`absolute flex items-center gap-3 text-[--mistake-color] text-lg z-10 top-1/2 left-1/2 -translate-x-1/2`}
      >
        <FaLock />
        Confirm email to track your history!
      </div>
      <div className="history-header flex sticky top-0 z-10 p-3 bg-[--bg-color]">
        <button className="flex items-center gap-2 text-[--text-color] w-[200px] hover:brightness-200 cursor-pointer">
          <TbHexagonLetterAFilled />
          WPM
          <RiExpandUpDownLine />
        </button>
        <div className="flex items-center gap-2 text-[--text-color] w-[200px]">
          <FiTarget />
          ACCURACY
        </div>
        <div className="flex items-center gap-2 text-[--text-color] w-[200px]">
          <MdOutlineError />
          MISTAKES
        </div>
        <div className="flex items-center gap-2 text-[--text-color] w-[200px]">
          <VscSettings />
          MODE
        </div>
        <div className="flex items-center gap-2 text-[--text-color] w-[200px]">
          <TbHexagonLetterAFilled />
          WORDS
        </div>
        <div className="flex items-center gap-2 text-[--text-color] w-[200px]">
          <IoTimeOutline />
          TIME
        </div>
        <div className="flex items-center gap-2 text-[--text-color] w-[200px]">
          <MdLanguage />
          LANGUAGE
        </div>
        <button className="flex items-center gap-2 text-[--text-color] w-[200px] hover:brightness-200 cursor-pointer">
          <CiCalendarDate />
          DATE
          <RiExpandUpDownLine />
        </button>
      </div>
      {fakeHistoryData.map((item) => (
        <div className="flex bg-[--bg-color] brightness-110 p-3 rounded-xl my-3 blur-lg">
          <div className="flex items-center gap-2 text-[--sub-color] w-[200px]">
            {item.wpm} <span className="text-[--text-color]">wpm</span>
          </div>
          <div className="flex items-center gap-2 text-[--sub-color] w-[200px]">
            {item.accuracy}%
          </div>
          <div className="flex items-center gap-2 text-[--sub-color] w-[200px]">
            {item.mistakes}
          </div>
          <div className="flex items-center gap-2 text-[--sub-color] w-[200px]">
            {item.mode}
          </div>
          <div className="flex items-center gap-2 text-[--sub-color] w-[200px]">
            {item.words}
          </div>
          <div className="flex items-center gap-2 text-[--sub-color] w-[200px]">
            {item.time}s
          </div>
          <div className="flex items-center gap-2 text-[--sub-color] w-[200px]">
            {item.language}
          </div>
          <div className="flex items-center gap-2 text-[--sub-color] w-[200px]">
            {item.date}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HiddenHistory;

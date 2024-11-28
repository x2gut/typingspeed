import { TbHexagonLetterAFilled } from "react-icons/tb";
import { FiTarget } from "react-icons/fi";
import { MdLanguage, MdOutlineError } from "react-icons/md";
import { ProfileResultsData } from "../../types/types";
import { IoTimeOutline } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { CiCalendarDate } from "react-icons/ci";
import { Dispatch, SetStateAction, useState } from "react";
import { RiExpandUpDownLine } from "react-icons/ri";

interface HistoryComponentProps {
  history: {
    total_items: number;
    history: ProfileResultsData[];
  };
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
}

const ProfileHistory: React.FC<HistoryComponentProps> = ({ history }) => {
  const [limit, setLimit] = useState<number>(10);
  const [isFilterDateUp, setIsFilterDateUp] = useState(false);
  const [isFilterWpmUp, setIsFilterWpmUp] = useState(false);

  const filterDateResults = (filterUp?: boolean) => {
    if (filterUp) {
      history.history.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    } else {
      history.history.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  };

  const filterWpmResults = (filterUp?: boolean) => {
    if (filterUp) {
      history.history.sort((a, b) => a.wpm - b.wpm);
    } else {
      history.history.sort((a, b) => b.wpm - a.wpm);
    }
  };

  return (
    <div className="history mt-5 mb-5 flex flex-col items-center">
      <div className="history-header flex sticky top-0 z-10 p-3 bg-[--bg-color]">
        <button
          className="flex items-center gap-2 text-[--text-color] w-[200px] hover:brightness-200 cursor-pointer"
          onClick={() => {
            filterWpmResults(isFilterWpmUp);
            setIsFilterWpmUp(!isFilterWpmUp);
          }}
        >
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
        <button
          className="flex items-center gap-2 text-[--text-color] w-[200px] hover:brightness-200 cursor-pointer"
          onClick={() => {
            filterDateResults(isFilterDateUp);
            setIsFilterDateUp(!isFilterDateUp);
          }}
        >
          <CiCalendarDate />
          DATE
          <RiExpandUpDownLine />
        </button>
      </div>
      {history["history"].slice(0, limit).map((item) => (
        <div className="flex bg-[--bg-color] brightness-110 p-3 rounded-xl my-3" key={item.id}>
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
            {new Date(item.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>
        </div>
      ))}
      {history.total_items > limit && (
        <button
          className="py-1 px-4 max-w-[150px] max-h-[80px] border-[--sub-color]
       border-2 brightness-75 text-[--text-correct-color] mb-5 hover:brightness-100 hover:-translate-y-[2px] duration-200"
          onClick={() => setLimit((prevData) => prevData + 10)}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default ProfileHistory;

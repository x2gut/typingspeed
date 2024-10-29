import { TbHexagonLetterAFilled } from "react-icons/tb";
import { FiTarget } from "react-icons/fi";
import { MdLanguage, MdOutlineError } from "react-icons/md";
import { ProfileResultsData } from "../../types/types";
import { IoTimeOutline } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { CiCalendarDate } from "react-icons/ci";
import { Dispatch, SetStateAction } from "react";

interface HistoryComponentProps {
  history: {
    total_items: number;
    history: ProfileResultsData[];
  };
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
}

const ProfileHistory: React.FC<HistoryComponentProps> = ({
  history,
  limit,
  setLimit,
}) => {
  return (
    <div className="history mt-5 mb-5 flex flex-col items-center">
      <div className="flex">
        <div className="flex items-center gap-2 text-[--text-color] w-[200px]">
          <TbHexagonLetterAFilled />
          WPM
        </div>
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
        <div className="flex items-center gap-2 text-[--text-color] w-[200px]">
          <CiCalendarDate />
          DATE
        </div>
      </div>
      {history["history"].map((item) => (
        <div className="flex bg-[--bg-color] brightness-110 p-3 rounded-xl my-3">
          <div className="flex items-center gap-2 text-[--sub-color] w-[200px]">
            {item.wpm}  <span className="text-[--text-color]">wpm</span>
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

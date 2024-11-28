import { FaLock } from "react-icons/fa6";
import ProfileStatItem from "./ProfileStatIem";

const HiddenStats = () => {
  return (
    <div className="profile-right bg-[--bg-color] brightness-90 w-[50%] h-96 relative">
        <div
        className={`absolute flex w-full max-w-[400px] items-center gap-3 text-[--mistake-color] text-lg z-10 top-1/2 left-1/2 -translate-x-1/2`}
      >
        <FaLock />
        Confirm email to track your stats!
      </div>
      <div className="upper-stat h-full blur-lg">
        <h4 className="text-center text-2xl font-semibold text-[--text-correct-color] py-3">
          Statistics
        </h4>
        <div className="flex gap-5 items-center justify-center my-5">
          <button
            className={`h-[40px] w-[130px] bg-[--bg-color] rounded-md text-[--sub-color] hover:brightness-75 duration-150 pointer-events-none`}
          >
            Time
          </button>
          <button
            className={`h-[40px] w-[130px] bg-[--bg-color] rounded-md text-[--sub-color] hover:brightness-75 duration-150 pointer-events-none`}
          >
            Words
          </button>
        </div>
        <div className="alltime-best flex justify-between p-2">
          <ProfileStatItem
            time={60}
            words={25}
            best={100}
            avg={100}
          />
          <ProfileStatItem
            time={60}
            words={25}
            best={100}
            avg={100}
          />
          <ProfileStatItem
            time={60}
            words={25}
            best={100}
            avg={100}
          />
        </div>
      </div>
    </div>
  );
};

export default HiddenStats;

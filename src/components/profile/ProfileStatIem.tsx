import { FaCrown } from "react-icons/fa6";
import { CiWavePulse1 } from "react-icons/ci";

interface ProfileStatItemProps {
  time: number;
  words: number;
  best: number;
  avg: number;
}

const ProfileStatItem: React.FC<ProfileStatItemProps> = ({
  time,
  words,
  best,
  avg,
}) => {
  return (
    <div className="bg-[--bg-color] brightness-[90%] w-[200px] h-[150px] p-3 rounded-md">
      <h6 className="text-lg text-[--sub-color] text-center mb-2">{words !== 0 ? words : time} {words !== 0 ? "Words" : "Seconds"}</h6>
      <div className="text-lg flex flex-col gap-3 text-[--sub-color]">
        <div className="bg-[--bg-color] brightness-125 p-1 rounded-md flex items-center gap-2">
          {" "}
          <FaCrown className="fill-[--main-color]"/>
          <span className="text-[--text-correct-color]">BEST </span>{" "}
          <span className="text-[--sub-color]">{best} WPM</span>
        </div>
        <div className="bg-[--bg-color] brightness-125 p-1 rounded-md flex items-center gap-2">
          {" "}
          < CiWavePulse1 />
          <span className="text-[--text-correct-color]">AVG </span>
          <span className="text-[--sub-color]">{avg} WPM</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStatItem;

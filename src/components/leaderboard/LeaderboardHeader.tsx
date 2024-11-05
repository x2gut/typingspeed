import { CiCalendarDate, CiUser } from "react-icons/ci";
import LeaderboardHeaderItem from "./LeaderboardHeaderItem";
import { TbCircleLetterWFilled, TbTargetArrow } from "react-icons/tb";

const LeaderboardHeader = () => {
  return (
    <ul className="leaderboard-header flex py-3">
      <LeaderboardHeaderItem label="user" icon={<CiUser />} />
      <LeaderboardHeaderItem label="wpm" icon={<TbCircleLetterWFilled />} />
      <LeaderboardHeaderItem label="accuracy" icon={<TbTargetArrow />} />
      <LeaderboardHeaderItem label="date" icon={<CiCalendarDate />} />
    </ul>
  );
};

export default LeaderboardHeader;

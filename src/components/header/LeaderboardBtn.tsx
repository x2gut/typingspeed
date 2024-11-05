import { MdLeaderboard } from "react-icons/md";
import { Link } from "react-router-dom";


const LeaderboardBtn = () => {
  return (
    <Link to={"/Leaderboard"} className="hover:brightness-125 active:brightness-150 duration-200">
      <MdLeaderboard />
    </Link>
  );
};

export default LeaderboardBtn;

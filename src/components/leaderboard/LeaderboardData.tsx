import React, { useState } from "react";
import { useQuery } from "react-query";
import { getUserProfilePicture } from "../../api/userProfileApi";
import { PiCrownSimpleFill } from "react-icons/pi";
import useAuthStore from "../../store/auth-store";

interface LeaderboardDataProps {
  user_id: number;
  username: string;
  wpm: number;
  accuracy: number;
  date: string;
  index: number;
}

const LeaderboardData: React.FC<LeaderboardDataProps> = ({
  user_id,
  username,
  wpm,
  accuracy,
  date,
  index,
}) => {
  const { userId } = useAuthStore();
  const [userPicture, setUserPicture] = useState("");

  const queryProfilePicture = useQuery(
    ["userPic", user_id],
    () => getUserProfilePicture(user_id),
    {
      onSuccess: (response) => {
        const blobUrl = URL.createObjectURL(response.data);
        setUserPicture(blobUrl);
      },
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="leaderboard-user my-2">
      <ul className="flex items-center p-3 rounded-lg bg-[--bg-color] brightness-90">
        <li className="text-lg flex items-center gap-2 text-[--text-correct-color] w-[350px]">
          {index === 0 ? <PiCrownSimpleFill color="yellow"/> : <span className="px-1">{index + 1}</span>}
          <div
            className="avatar w-6 h-6 rounded-full bg-center bg-cover"
            style={{ backgroundImage: `url(${userPicture})` }}
          ></div>
          {username}
          {userId === user_id && (
            <span className="text-sm px-3 text-[--text-color] bg-[--sub-color] rounded-lg animate-pulse">
              You
            </span>
          )}
        </li>
        <li className="text-lg text-[--text-correct-color] w-[350px]">{wpm}</li>
        <li className="text-lg text-[--text-correct-color] w-[350px]">
          {accuracy}%
        </li>
        <li className="text-lg text-[--text-correct-color] w-[350px]">
          {new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </li>
      </ul>
    </div>
  );
};

export default LeaderboardData;

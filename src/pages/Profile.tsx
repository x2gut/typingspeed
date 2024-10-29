import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import { useTheme } from "../contexts/ThemeProvider";
import { MdEmail } from "react-icons/md";
import { GrStatusCriticalSmall } from "react-icons/gr";
import useProfile from "../hooks/useProfile";
import { useNotice } from "../contexts/NoticeContext";
import ProfileStatistics from "../components/profile/ProfileSatistics";
import ProfileHistory from "../components/profile/History";

const Profile = () => {
  const [limit, setLimit] = useState(10);
  const { isAuthenticated, userId } = useAuth();
  const { showNotice } = useNotice();
  const { colors } = useTheme();
  const navigate = useNavigate();
  const pictureChangeInputRef = useRef<HTMLInputElement | null>(null);
  const { userPicture, profileData, avgStats, history, handlePictureChange } =
    useProfile(showNotice, userId, limit);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="container">
      <div className="profile-upper flex flex-row gap-28">
        <div className="profile-left flex flex-col items-center pt-5 bg-[--bg-color] brightness-90 w-[50%] h-96">
          <div className="user-id text-3xl pl-5 opacity-50 font-light text-[--text-correct-color] w-full">
            {profileData.id}
          </div>
          <div
            className={
              "avatar relative w-20 h-20 rounded-full pb-5 bg-center bg-cover"
            }
            style={{
              backgroundImage: `url(${userPicture})`,
            }}
          >
            <button>
              <IoAddCircle
                size={24}
                className="absolute bottom-0 right-0"
                color={colors.subColor}
                onClick={() => {
                  if (pictureChangeInputRef.current) {
                    pictureChangeInputRef.current.click();
                  }
                }}
              />
            </button>
            <input
              type="file"
              className="hidden"
              ref={pictureChangeInputRef}
              accept=".jpg,.jpeg,.png"
              onChange={handlePictureChange}
            />
          </div>
          <div className="username text-2xl font-light text-[--text-correct-color] pb-5">
            {profileData.username}
          </div>
          <div className="information w-full p-2">
            <div className="flex items-center gap-2 text-2xl font-light text-[--text-correct-color] pb-5 break-words w-full max-w-full">
              <div className="flex gap-1 items-center">
                <MdEmail />
                email:
              </div>
              {profileData.email}
            </div>
            <div
              className={`flex items-center gap-2 active text-2xl font-light pb-5 ${
                profileData.isActive
                  ? "text-[--text-correct-color]"
                  : "text-[--mistake-color]"
              }`}
            >
              <span className="flex items-center gap-1 text-[--text-color]">
                <GrStatusCriticalSmall />
                user status:
              </span>
              {profileData.isActive ? "Confirmed" : "Not confirmed"}
            </div>
          </div>
        </div>
        <ProfileStatistics avgStats={avgStats} />
      </div>
      <ProfileHistory history={history} limit={limit} setLimit={setLimit}/>
    </div>
  );
};

export default Profile;

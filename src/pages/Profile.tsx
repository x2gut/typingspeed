import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import { useTheme } from "../contexts/ThemeProvider";
import { MdEmail } from "react-icons/md";
import { GrStatusCriticalSmall } from "react-icons/gr";
import { FaPen } from "react-icons/fa6";
import useProfile from "../hooks/useProfile";
import ProfileStatistics from "../components/profile/ProfileSatistics";
import ProfileHistory from "../components/profile/History";
import Spinner from "../components/common/Spinner";
import {useAuthStore} from "../store/auth-store";
import Container from "../components/common/Container";
import HiddenHistory from "../components/profile/HiddenHistory";
import HiddenStats from "../components/profile/HiddenStats";
import { useMutation } from "react-query";
import { sendEmail } from "../api/userProfileApi";
import UpdateEmailModal from "../modals/updateEmailModal";

const Profile = () => {
  const [limit, setLimit] = useState(10);
  const { isAuthenticated, userId, email } = useAuthStore();
  const { colors } = useTheme();
  const navigate = useNavigate();
  const pictureChangeInputRef = useRef<HTMLInputElement | null>(null);
  const {
    userPicture,
    profileData,
    avgStats,
    history,
    handlePictureChange,
    isLoading,
  } = useProfile(userId, {
    fetchUserPicture: true,
    fetchProfileData: true,
    fetchResultsData: true,
    fetchHistory: true,
  });
  const [isModalActive, setIsModalActive] = useState(false);

  const sendEmailMutation = useMutation(sendEmail, {
    onError: () => {
      console.log("Error")
    },
    onSuccess: () => {
      console.log("Success")
    }
  }) 

  const handleSendEmail = () => {
      sendEmailMutation.mutate({email, userId})
    }
  

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    document.title = "Profile";
  }, [isAuthenticated]);

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="profile-upper flex flex-row gap-28">
            {isModalActive && (
              <UpdateEmailModal setIsModalActive={setIsModalActive} />
            )}
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
                  <div className="flex gap-2 items-center">
                    <MdEmail />
                    email:
                  </div>
                  {profileData.email}
                  <button onClick={() => setIsModalActive(true)}>
                    <FaPen
                      size={18}
                      className="hover:brightness-75 duration-200"
                    />
                  </button>
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
                  {profileData.isActive ? (
                    "confirmed"
                  ) : (
                    <div className="flex gap-3 items-center">
                      <span>not confirmed</span>
                      <button
                        className="text-[--sub-color] text-lg px-4 border-2 border-[--main-color] rounded-md hover:text-[--main-color] hover:border-[--sub-color] duration-200"
                        onClick={handleSendEmail}
                      >
                        confirm
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[--text-color]">
                  User since:{" "}
                  {new Date(profileData.created_at).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    }
                  )}
                </span>
              </div>
            </div>
            {profileData.isActive && avgStats !== null ? (
              <ProfileStatistics avgStats={avgStats} />
            ) : (
              <HiddenStats />
            )}
          </div>
          {profileData.isActive && history !== null ? (
            <ProfileHistory
              history={history}
              limit={limit}
              setLimit={setLimit}
            />
          ) : (
            <HiddenHistory />
          )}
        </>
      )}
    </Container>
  );
};

export default Profile;

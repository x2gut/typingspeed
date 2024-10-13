import { useEffect, useState } from "react";
import { getUserProfilePicture } from "../api/userProfile";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { isAuthenticated } = useAuth();
  const [userPicture, setUserPicture] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }

    const profilePic = async () => {
      const url = await getUserProfilePicture();
      if (url) {
        console.log(url)
        setUserPicture(url)
      }
    };

    profilePic();
  }, []);

  return (
    <div className="container flex flex-row gap-28">
      <div className="profile-left bg-[--bg-color] brightness-90 w-96 h-96">
        <div className="avatar max-w-16 max-h-16">
          <img src={userPicture} alt="userProfile" />
        </div>
      </div>
      <div className="profile-right bg-[--bg-color] brightness-90 w-96 h-96"></div>
    </div>
  );
};

export default Profile;

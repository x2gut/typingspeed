import { FaRegUser } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useState } from "react";
import { useNotice } from "../../contexts/NoticeContext";

const UserProfileBtn = () => {
  const { username, setIsAuthenticated } = useAuth();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const { showNotice } = useNotice();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => setIsHidden(false)}
      onMouseLeave={() => {
        setIsHidden(true);
      }}
    >
      <div className="flex items-center gap-1 hover:brightness-150 duration-150 mb-2 relative">
        <FaRegUser size={18} />
        {username}
      </div>
      <div
        className={`flex-col bg-[--sub-accent-color] fixed z-20 p-2 rounded-lg transition-opacity duration-200 ease-in-out ${
          isHidden ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onMouseLeave={() => {
          setIsHidden(true);
        }}
      >
        <Link
          className="flex items-center gap-2 hover:brightness-200 duration-150"
          to={"/profile"}
        >
          <CgProfile />
          Profile
        </Link>
        <button
          className="flex items-center gap-2 hover:brightness-200 duration-150"
          onClick={() => {
            handleLogout();
            showNotice("You are signed out now", "info", 5000);
          }}
        >
          <CiLogout />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfileBtn;

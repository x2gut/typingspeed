import React, { useState } from "react";
import { LiaSpaceShuttleSolid } from "react-icons/lia";
import RegisterModal from "../../modals/RegisterModal";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeProvider";
import LoginModal from "../../modals/LoginModal";
import AuthBtn from "./AuthBtn";
import UserProfileBtn from "./UserProfile";
import LeaderboardBtn from "./LeaderboardBtn";
import useAuthStore from "../../store/auth-store";
import Tooltip from "../common/Tooltip";
import SettingsBtn from "./SettingsBtn";

const Header: React.FC = () => {
  const { colors } = useTheme();
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { isAuthenticated, userId } = useAuthStore();

  return (
    <header
      className={`container header flex justify-between py-3 transition-opacity`}
    >
      <RegisterModal
        isRegister={isRegister}
        setIsRegister={setIsRegister}
        setIsLogin={setIsLogin}
      />
      <LoginModal
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setIsRegister={setIsRegister}
      />
      <div className="header-left flex gap-6 items-center">
        <div className="header-logo">
          <Link className="flex items-center justify-center gap-3" to="/">
            <LiaSpaceShuttleSolid size={36} color={colors.mainColor} className="-rotate-45"/>
            <p className="text-[30px] font-bold">TypeSpace</p>
          </Link>
        </div>
        <Tooltip tooltipLabel="settings">
          <SettingsBtn />
        </Tooltip>
        <Tooltip tooltipLabel="leaderboard">
          <LeaderboardBtn />
        </Tooltip>
      </div>
      <div className="header-right flex items-center justify-center">
        {isAuthenticated ? (
          <UserProfileBtn />
        ) : (
          <AuthBtn isRegister={isRegister} setIsRegister={setIsRegister} />
        )}
      </div>
    </header>
  );
};

export default Header;

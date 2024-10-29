import React, { useState } from "react";
import { FaKeyboard } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import RegisterModal from "../../modals/RegisterModal";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeProvider";
import LoginModal from "../../modals/LoginModal";
import { useAuth } from "../../contexts/authContext";
import AuthBtn from "./AuthBtn";
import UserProfileBtn from "./UserProfile";

const Header: React.FC = () => {
  const { colors } = useTheme();
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { isAuthenticated, username } = useAuth();

  return (
    <header
      className={`container header flex justify-between py-3 transition-opacity`}
    >
      <div className="header-left flex gap-6 items-center">
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
        <div className="header-logo">
          <Link className="flex items-center justify-center gap-3" to="/">
            <FaKeyboard size={36} color={colors.mainColor} />
            <p className="text-[30px] font-bold">TypeTest</p>
          </Link>
        </div>
        <Link to="/settings" className="header-settings">
          <IoSettings
            size={20}
            className="hover:rotate-90 transition-all duration-300"
          />
        </Link>
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

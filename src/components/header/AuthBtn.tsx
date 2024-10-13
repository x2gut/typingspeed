import React, { Dispatch, SetStateAction } from "react";
import { useTheme } from "../../contexts/ThemeProvider";
import { FaRegUser } from "react-icons/fa6";

interface AuthBtnProps {
  setIsRegister: Dispatch<SetStateAction<boolean>>;
  isRegister: boolean;
}

const AuthBtn: React.FC<AuthBtnProps> = ({ isRegister, setIsRegister }) => {
  return (
    <div className="user">
      <button
        className="header-user"
        onClick={() => setIsRegister(!isRegister)}
      >
        <FaRegUser size={18}/>
      </button>
    </div>
  );
};

export default AuthBtn;

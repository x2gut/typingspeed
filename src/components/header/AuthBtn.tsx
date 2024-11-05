import React, { Dispatch, SetStateAction } from "react";
import { FaRegUser } from "react-icons/fa6";

interface AuthBtnProps {
  setIsRegister: Dispatch<SetStateAction<boolean>>;
  isRegister: boolean;
}

const AuthBtn: React.FC<AuthBtnProps> = ({ isRegister, setIsRegister }) => {
  return (
    <div className="user">
      <button
        className="header-user hover:brightness-150 active:brightness-200 duration-200"
        onClick={() => setIsRegister(!isRegister)}
      >
        <FaRegUser size={18}/>
      </button>
    </div>
  );
};

export default AuthBtn;

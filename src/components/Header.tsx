import React, { Dispatch, SetStateAction } from "react";
import { FaKeyboard } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

interface HeaderProps {
  isRegister:boolean
  setIsRegister: Dispatch<SetStateAction<boolean>>
}

const Header: React.FC<HeaderProps> = ({ setIsRegister, isRegister }) => {
  return (
    <header className={`header flex justify-between py-4 transition-opacity`}>
      <div className="header-left flex gap-6 items-center">
        <div className="header-logo">
          <a className="flex items-center gap-3" href="#">
            <FaKeyboard size={52} />
            <p className="text-3xl font-bold">TypeTest</p>
          </a>
        </div>
        <a href="" className="header-settings">
          <IoSettings size={20} className="hover:rotate-90 transition-all duration-300"/>
        </a>
      </div>
      <div className="header-right flex items-center">
        <div className="user">
          <button className="header-user" onClick={() => setIsRegister(!isRegister)}>
            <FaRegUser size={28} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

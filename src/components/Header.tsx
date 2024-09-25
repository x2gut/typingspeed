import React, { useState } from "react";
import { FaKeyboard } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import RegisterModal from "../modals/registerModal";
import { Link } from "react-router-dom";

const Header: React.FC = () => {

  const [isRegister, setIsRegister] = useState(false)

  return (
    <header className={`container header flex justify-between py-4 transition-opacity`}>
      <div className="header-left flex gap-6 items-center">
      <RegisterModal isRegister={isRegister} setIsRegister={setIsRegister}/>
        <div className="header-logo">
          <Link className="flex items-center gap-3" to="/">
            <FaKeyboard size={52} />
            <p className="text-3xl font-bold">TypeTest</p>
          </Link>
        </div>
        <Link to="/settings" className="header-settings">
          <IoSettings size={20} className="hover:rotate-90 transition-all duration-300" />
        </Link>
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

import React from "react";
import { FaKeyboard } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className="header flex justify-between py-4">
      <div className="header-left">
        <div className="header-logo">
          <a  className= "flex items-center gap-3"href="/">
            <FaKeyboard size={52}/>
            <p className="text-3xl font-bold">TypeTest</p>
          </a>
        </div>
      </div>
      <div className="header-right flex items-center">
        <div className="user">
            <a className="" href=""><FaRegUser size={28} />
            </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

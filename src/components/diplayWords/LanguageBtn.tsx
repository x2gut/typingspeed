import React, { Dispatch, SetStateAction } from "react";
import { FaEarthEurope } from "react-icons/fa6";
import useSettingsStore from "../../store/settings-store";

interface LangBtnProps {
  isModalActive: boolean;
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

const LanguageBtn: React.FC<LangBtnProps> = ({
  isModalActive,
  setIsModalActive,
}) => {
  const { gameSettings } = useSettingsStore();

  return (
    <button
      className="lang-btn text-base font-boldr flex gap-2 items-center"
      onClick={() => setIsModalActive(!isModalActive)}
    >
      <FaEarthEurope size={16} />
      {gameSettings.lang}
    </button>
  );
};

export default LanguageBtn;

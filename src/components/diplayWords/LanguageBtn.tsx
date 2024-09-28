import React, { Dispatch, SetStateAction } from "react";
import { FaEarthEurope } from "react-icons/fa6";
import { useTypeSettings } from "../../contexts/TypeSettingsContext";

interface LangBtnProps {
  isModalActive: boolean;
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

const LanguageBtn: React.FC<LangBtnProps> = ({
  isModalActive,
  setIsModalActive,
}) => {
  const { typeSettings } = useTypeSettings();

  return (
    <button
      className="lang-btn text-xl font-boldr flex gap-2 items-center"
      onClick={() => setIsModalActive(!isModalActive)}
    >
      <FaEarthEurope size={20} />
      {typeSettings.lang}
    </button>
  );
};

export default LanguageBtn;

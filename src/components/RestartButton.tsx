import React, { useContext, useMemo } from "react";
import { MdOutlineRestartAlt } from "react-icons/md";
import { useTheme } from "../contexts/ThemeProvider";

const RestartButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const {theme, handleThemeChange} = useTheme()

  const memorizedComponent = useMemo(() => {
    return <button
      className="my-3 p-3 hover:bg-gray-800 rounded-xl transition-all 0.3s"
      onClick={() => {
        onClick()
      }}
    >
      <MdOutlineRestartAlt color="#52525b" size={28} />
    </button>;
  }, [onClick]);
  return memorizedComponent;
};

export default RestartButton;

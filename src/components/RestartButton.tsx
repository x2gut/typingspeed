import React, { useContext, useMemo } from "react";
import { MdOutlineRestartAlt } from "react-icons/md";
import { useTheme } from "../contexts/ThemeProvider";

const RestartButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const {theme, handleThemeChange} = useTheme()

  const memorizedComponent = useMemo(() => {
    const {colors} = useTheme();
    return <button
      className="restart-btn my-3 p-3 relative"
      onClick={() => {
        onClick()
      }}
      tabIndex={2}
    >
      <MdOutlineRestartAlt size={28} color={colors.subColor}/>
    </button>;
  }, [onClick]);
  return memorizedComponent;
};

export default RestartButton;

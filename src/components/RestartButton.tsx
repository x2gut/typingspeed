import React, { useContext, useMemo } from "react";
import { MdOutlineRestartAlt } from "react-icons/md";
import { useTheme } from "../contexts/ThemeProvider";

const RestartButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const { theme, handleThemeChange } = useTheme();
  const { colors } = useTheme();

  const memorizedComponent = useMemo(() => {
    return (
      <button
        className="restart-btn my-3 p-3 relative outline-none"
        onClick={() => {
          onClick();
        }}
        tabIndex={2}
      >
        <MdOutlineRestartAlt size={28} color={colors.subColor} />
      </button>
    );
  }, [onClick]);
  return memorizedComponent;
};

export default RestartButton;

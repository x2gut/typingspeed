import React, { useMemo, useRef } from "react";
import { MdOutlineRestartAlt } from "react-icons/md";
import { useTheme } from "../contexts/ThemeProvider";

const RestartButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const { colors } = useTheme();
  const restarnBtnRef = useRef<HTMLButtonElement>(null);

  const memorizedComponent = useMemo(() => {
    return (
      <button
        ref={restarnBtnRef}
        className="restart-btn my-3 p-3 relative outline-none"
        onClick={() => {
          onClick();
          if (restarnBtnRef.current) {
            restarnBtnRef.current.blur()
          }
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

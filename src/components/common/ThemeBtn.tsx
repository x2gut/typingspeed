import React, { useEffect } from "react";
import { useTheme } from "../../contexts/ThemeProvider";
import { themes } from "../../themes/themes";

interface ThemeButtonProps {
  value: string;
  className?: string | undefined;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ value, className = "" }) => {
  const { theme, handleThemeChange } = useTheme();
  return (
    <button
      style={{
        color: themes[value]["--main-color"],
        backgroundColor: themes[value]["--bg-color"],
        border:
          value === theme ? `2px solid ${themes[value]["--sub-color"]}` : "",
      }}
      className={`theme p-2 mb-3 rounded-lg hover:scale-105 transition-all duration-200 tracking-widest ${className}`}
      onClick={() => handleThemeChange(value)}
    >
      {value}
    </button>
  );
};

export default ThemeButton;

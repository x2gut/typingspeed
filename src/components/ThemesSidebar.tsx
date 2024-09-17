import { useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeProvider";
import { themes } from "../themes/themes";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

interface ThemeSidebarProps {
  className: string;
}

const ThemesSidebar: React.FC<ThemeSidebarProps> = ({ className }) => {
  const { handleThemeChange } = useTheme();
  const currentTheme = localStorage.getItem("theme");
  const { colors } = useTheme();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const arrowBtnRef = useRef<HTMLButtonElement>(null);

  const handleSidebarToggle = () => {
    if (sidebarRef.current && arrowBtnRef.current) {
      sidebarRef.current.classList.toggle("collapsed");
      arrowBtnRef.current.classList.toggle("rotated");
    }
  };

  return (
    <div
      className={`themes-sidebar-wrapper collapsed absolute left-0 z-10 bottom-1/2 transition-all ${className}`}
      ref={sidebarRef}
    >
      <div className="themes-sidebar h-72 w-52 rounded-3xl relative">
        <div className="themes-sidebar-content px-5 flex flex-col">
          {Object.keys(themes).map((value) => {
            return (
              <button
                style={{
                  color: themes[value]["--main-color"],
                  backgroundColor: themes[value]["--bg-color"],
                  border:
                    value === currentTheme
                      ? `1px solid ${themes[value]["--sub-color"]}`
                      : "",
                }}
                className="theme p-2 mb-3 rounded-lg hover:scale-105 transition-all 0.2s tracking-widest"
                key={value}
                onClick={() => {
                  handleThemeChange(value);
                }}
              >
                {value}
              </button>
            );
          })}
        </div>
      </div>
      <button
        className="sidebar-arrow-btn absolute bottom-0 -right-1/4 hover:translate-x-1 duration-75"
        ref={arrowBtnRef}
      >
        <MdKeyboardDoubleArrowRight
          size={28}
          color={colors.mainColor}
          onClick={handleSidebarToggle}
        />
      </button>
    </div>
  );
};
export default ThemesSidebar;

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../contexts/ThemeProvider";
import { themes } from "../../themes/themes";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { HiMagnifyingGlass } from "react-icons/hi2";
import SearchInput from "../common/SearchInput";
import ThemeButton from "../common/ThemeBtn";
import useSettingsStore from "../../store/settings-store";

interface ThemeSidebarProps {
  className: string;
}

const ThemesSidebar: React.FC<ThemeSidebarProps> = ({ className }) => {
  const { colors } = useTheme();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const arrowBtnRef = useRef<HTMLButtonElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { gameSettings } = useSettingsStore();

  const filteredData = Object.keys(themes).filter((item) =>
    item.toLowerCase().includes(searchTerm)
  );

  const handleSidebarToggle = () => {
    if (sidebarRef.current && arrowBtnRef.current) {
      sidebarRef.current.classList.toggle("collapsed");
      arrowBtnRef.current.classList.toggle("rotated");
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node) &&
      !arrowBtnRef.current?.contains(event.target as Node)
    ) {
      sidebarRef.current.classList.add("collapsed");
      arrowBtnRef.current?.classList.remove("rotated");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {gameSettings.themesSidebar && (
        <div
          className={`themes-sidebar-wrapper collapsed absolute left-0 z-10 bottom-1/2 transition-all ${className}`}
          ref={sidebarRef}
        >
          <div className="themes-sidebar h-72 w-52 rounded-3xl relative">
            <div className="themes-sidebar-content px-5 flex flex-col">
              <div className="search-container m-auto relative">
                <SearchInput
                  placeholder="Search theme"
                  setSearchTerm={setSearchTerm}
                  className="rounded-md p-2 outline-none mb-3 relative max-w-40 pl-8"
                />
                <HiMagnifyingGlass className="absolute left-2 top-3" />
              </div>
              {filteredData.map((value) => {
                return <ThemeButton key={value} newTheme={value} />;
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
      )}
    </>
  );
};

export default ThemesSidebar;

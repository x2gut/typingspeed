import { useTheme } from "../contexts/ThemeProvider";
import { themes } from "../themes/themes";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const ThemesSidebar = () => {
  const { theme, handleThemeChange } = useTheme();
  const currentTheme = localStorage.getItem("theme");
  const { colors } = useTheme();
  return (
    <div className="themes-sidebar h-72 w-52 absolute left-0 z-10 rounded-3xl">
      <div className="themes-sidebar-content px-5 flex flex-col">
        <h2 className="themes-sidebar-title mb-10 text-2xl text-center">
          THEMES
        </h2>
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
      <button className="sidebar-arrow-btn absolute top-1/2 right-0 translate-x-12">
        <MdKeyboardDoubleArrowRight size={28} color={colors.mainColor} />
      </button>
    </div>
  );
};

export default ThemesSidebar;

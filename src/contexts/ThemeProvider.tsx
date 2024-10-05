import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { themes } from "../themes/themes";
import getRandomTheme from "../utils/getRandomTheme";

const ThemeContext = createContext<any>(null);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState("base");
  const [colors, setColors] = useState({
    mainColor: "#facc15",
    subColor: "#cbd5e1",
    mistakeColor: "#e11d48",
    correctTextColor: "#e4e4e7",
  });

  const applyRandomTheme = () => {
    applyTheme(getRandomTheme());
  }

  const applyTheme = (theme: string) => {
    const newTheme = themes[theme];
    const root = document.documentElement;
    for (const key in newTheme) {
      root.style.setProperty(key, newTheme[key]);
      switch (key) {
        case "--main-color":
          setColors((prevColors) => ({
            ...prevColors,
            mainColor: newTheme[key],
          }));
          break;
        case "--sub-color":
          setColors((prevColors) => ({
            ...prevColors,
            subColor: newTheme[key],
          }));
          break;
        case "--mistake-color":
          setColors((prevColors) => ({
            ...prevColors,
            mistakeColor: newTheme[key],
          }));
          break;
        case "--text-corect-color":
          setColors((prevColors) => ({
            ...prevColors,
            correctTextColor: newTheme[key],
          }));
          break;
        case "--bg-color":
          setColors((prevColors) => ({
            ...prevColors,
            bgColor: newTheme[key],
          }));
          break;
      }
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "base";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, colors, handleThemeChange, applyRandomTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

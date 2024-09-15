import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const ThemeContext = createContext<any>(null);

export const useTheme = () => {
    return useContext(ThemeContext);
  };

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState("base");

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    if (theme === "base") {
      root.style.setProperty("--bg-color", "#171717");
      root.style.setProperty("--main-color", "#facc15");
      root.style.setProperty("--sub-color", "#cbd5e1");
      root.style.setProperty("-sub-accent-color", "#64748b");
      root.style.setProperty("--text-color", "#52525b");
      root.style.setProperty(" --mistake-color", "#e11d48");
      root.style.setProperty("--text-correct-color", "#e4e4e7");
    }

    if (theme === "matcha") {
      root.style.setProperty("--bg-color", "#44624a");
      root.style.setProperty("--main-color", "#ffffff")
      root.style.setProperty("--sub-color", "#8ba888");
      root.style.setProperty("-sub-accent-color", "#64748b");
      root.style.setProperty("--text-color", "#f1ebe1");
      root.style.setProperty(" --mistake-color", "#e11d48");
      root.style.setProperty("--text-correct-color", "#ffffff");

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
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

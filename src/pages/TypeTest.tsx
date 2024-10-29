import React, { useEffect, useState } from "react";
import DisplayWords from "../components/diplayWords/DisplayWords";
import TypeSettingsMenu from "../components/diplayWords/TypeSettingsMenu";
import {
  useTypeSettings,
} from "../contexts/TypeSettingsContext";
import FooterCommands from "../components/diplayWords/FooterCommands";
import ThemesSidebar from "../components/diplayWords/ThemesSidebar";
import { useAuth } from "../contexts/authContext";
import { useQuery } from "react-query";
import { getConfig } from "../api/configApi";
import { useTheme } from "../contexts/ThemeProvider";

const TypeTest: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [currentLang, setCurrentLang] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const { isAuthenticated } = useAuth();
  const { handleThemeChange } = useTheme();
  const { setTypeSettings } = useTypeSettings();

  const config = useQuery(["config"], getConfig, {
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      const config = response.data[0].config[0];
      const theme = response.data[1];

      handleThemeChange(theme);

      setTypeSettings({
        layout: config?.layout,
        lang: config?.lang,
        mode: config?.mode,
        time: Number(config.time),
        words: Number(config.words),
        keyboard: {
          show: config?.keyboard.show,
          responsive: config?.keyboard.responsive,
        },
        soundOnPress: config?.soundOnPress,
        caretType: config?.caretType,
        caretRainbow: config?.caretRainbow,
        randomTheme: config?.randomTheme,
        themesSidebar: config?.themesSidebar,
        wordsHistory: config?.wordsHistory,
      });
    },
  });

  useEffect(() => {
    const result = localStorage.getItem("config")
      ? JSON.parse(localStorage.getItem("config") as string)
      : null;

    setCurrentLang(result?.lang || "english");

    document.title = "TypeTest";
  }, []);

  useEffect(() => {
    fetch(`/typingspeed/languages/${currentLang}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch: " + response.statusText);
        }
        return response.json();
      })
      .then((jsonData) => {
        setWords(jsonData.words);
      })
      .catch((error) => console.error("Execution failed: ", error));
  }, [currentLang]);

  return (
    <>
      {words.length > 0 && (
        <div className="container">
          <TypeSettingsMenu className={isFocused ? "focus" : ""} />
          <ThemesSidebar className={isFocused ? "focus" : ""} />
          <div className="display-words flex items-center flex-col h-[600px]">
            <DisplayWords
              setCurrentLang={setCurrentLang}
              wordsList={words}
              setIsFocused={setIsFocused}
            />
          </div>
          <FooterCommands className={isFocused ? "focus" : ""} />
        </div>
      )}
    </>
  );
};

export default TypeTest;

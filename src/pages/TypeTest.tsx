import React, { useEffect, useState } from "react";
import DisplayWords from "../components/diplayWords/DisplayWords";
import Header from "../components/header/Header";
import TypeSettingsMenu from "../components/diplayWords/TypeSettingsMenu";
import { TypeSettingsProvider } from "../contexts/TypeSettingsContext";
import { ThemeProvider } from "../contexts/ThemeProvider";
import FooterCommands from "../components/diplayWords/FooterCommands";
import ThemesSidebar from "../components/ThemesSidebar";
const TypeTest: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [currentLang, setCurrentLang] = useState("");
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    const result = localStorage.getItem("config")
      ? JSON.parse(localStorage.getItem("config") as string)
      : null;

    setCurrentLang(result.lang);
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
        <div className="page-content min-h-screen">
          <div className="container">
            <Header />
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
        </div>
      )}
    </>
  );
};

export default TypeTest;

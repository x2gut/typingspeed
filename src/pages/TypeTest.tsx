import React, { useEffect, useState } from "react";
import DisplayWords from "../components/diplayWords/DisplayWords";
import TypeSettingsMenu from "../components/diplayWords/TypeSettingsMenu";
import FooterCommands from "../components/diplayWords/FooterCommands";
import ThemesSidebar from "../components/diplayWords/ThemesSidebar";
import Container from "../components/common/Container";
import useConfig from "../hooks/useConfig";
import useSettingsStore from "../store/settings-store";
import Result from "../components/diplayWords/result/Result";
import Keyboard from "../components/diplayWords/responsiveKeyboard/Keyboard";
import RestartButton from "../components/diplayWords/RestartButton";
import { useTheme } from "../contexts/ThemeProvider";
import Tooltip from "../components/common/Tooltip";
import useResultStore from "../store/result-store";
import useProfile from "../hooks/useProfile";
import useAuthStore from "../store/auth-store";

const TypeTest: React.FC = () => {
  const [currentLang, setCurrentLang] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [isResetData, setIsResetData] = useState(false);
  const { typeSettings, gameSettings, setTypeSettings } = useSettingsStore();
  const { applyRandomTheme } = useTheme();
  const { resetUserResults } = useResultStore();
  const {userId} = useAuthStore();
  const {avgStats} = useProfile(userId, {fetchResultsData: true})
  const { config } = useConfig();

  useEffect(() => {
    const result = localStorage.getItem("config")
      ? JSON.parse(localStorage.getItem("config") as string)
      : null;

    setCurrentLang(result?.lang || "english");

    document.title = "TypeTest";
  }, [gameSettings.lang]);

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
        <Container>
          <TypeSettingsMenu className={typeSettings.isFocused ? "focus" : ""} />
          <ThemesSidebar className={typeSettings.isFocused ? "focus" : ""} />
          <div className="display-words flex items-center flex-col h-[600px]">
            {typeSettings.isTimeOut && avgStats !== null ? (
              <Result avgStats={avgStats}/>
            ) : (
              <DisplayWords
                wordsList={words}
                isResetData={isResetData}
              />
            )}
            {gameSettings.keyboard.show && !typeSettings.isTimeOut && (
              <Keyboard
                isFocused={typeSettings.isFocused}
                isResponsive={gameSettings.keyboard.responsive}
              />
            )}
            <Tooltip tooltipLabel="Restart">
              <RestartButton
                onClick={() => {
                  if (gameSettings.randomTheme && typeSettings.isTimeOut) {
                    applyRandomTheme();
                  }
                  setTypeSettings({ isTimeOut: false, isGameStarted: false });
                  resetUserResults();
                  setIsResetData(!isResetData);
                }}
              />
            </Tooltip>
          </div>
          <FooterCommands className={typeSettings.isFocused ? "focus" : ""} />
        </Container>
      )}
    </>
  );
};

export default TypeTest;

import { TbKeyboard } from "react-icons/tb";
import { CgLoadbarSound } from "react-icons/cg";
import { CiRainbow } from "react-icons/ci";

import { playAudio } from "../../utils/playAudio";
import SettingsBtn from "./settingsBtn";
import { themes } from "../../themes/themes";
import ThemeButton from "../common/ThemeBtn";
import { FaRandom } from "react-icons/fa";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { MdHistory } from "react-icons/md";
import Container from "../common/Container";
import useSettingsStore from "../../store/settings-store";
import { useMutation } from "react-query";
import { updateConfig } from "../../api/configApi";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import {useAuthStore} from "../../store/auth-store";

const SettingsMain = ({}) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true)
  const { gameSettings, setGameSettings } = useSettingsStore();
  const {isAuthenticated, userId} = useAuthStore();
  const mutation = useMutation(updateConfig, {
    onError: (error) => console.log(error),
  });

  const debouncedMutation = useDebounce(mutation.mutate, 750);

  useEffect(() => {
    if (!isFirstLaunch && isAuthenticated) {
      debouncedMutation({userId: userId, config: gameSettings})
    } else {
      setIsFirstLaunch(false)
    }
  }, [gameSettings]);

  const handleKeyboardSettings = (isShow: boolean, isResponsive = false) => {
    setGameSettings({
      keyboard: {
        show: isShow,
        responsive: isResponsive,
      },
    });
  };

  const handleSoundSettings = (soundStatus: boolean | string) => {
    setGameSettings({ soundOnPress: soundStatus });
  };

  const handleCaretType = (caretType: boolean | string) => {
    setGameSettings({
      caretType: caretType,
    });
  };

  const handleCaretRainbow = (caretRainbow: boolean) => {
    setGameSettings({
      caretRainbow: caretRainbow,
    });
  };

  const handleRandomTheme = (randomTheme: boolean) => {
    setGameSettings({
      randomTheme: randomTheme,
    });
  };

  const handleThemesSidebar = (themesSidebar: boolean) => {
    setGameSettings({
      themesSidebar: themesSidebar,
    });
  };

  const handleWordsHistory = (wordsHistory: boolean) => {
    setGameSettings({
      wordsHistory: wordsHistory,
    });
  };

  return (
    <Container>
      <div className="settings-top">
        <h2 className="settings-title my-20 text-4xl">Settings</h2>
      </div>
      <div className="settings-option keyboard">
        <div className="option-content">
          <div className="option-title">
            <TbKeyboard />
            <h4>Keyboard</h4>
          </div>
          <p className="option-desc">Show keyboard below the displayed words</p>
        </div>
        <div className="option-buttons">
          <SettingsBtn
            label="Off"
            callback={() => handleKeyboardSettings(false)}
            className={!gameSettings.keyboard.show ? "active" : ""}
          />
          <SettingsBtn
            label="Show"
            callback={() => handleKeyboardSettings(true, false)}
            className={gameSettings.keyboard.show ? "active" : ""}
          />
          <SettingsBtn
            label="Responsive"
            callback={() =>
              handleKeyboardSettings(true, !gameSettings.keyboard.responsive)
            }
            className={gameSettings.keyboard.responsive ? "active" : ""}
          />
        </div>
      </div>
      <div className="settings-option sound">
        <div className="option-content">
          <div className="option-title">
            <CgLoadbarSound />
            <h4>Sounds</h4>
          </div>
          <p className="option-desc">Play sound whenever u press on a key</p>
        </div>
        <div className="option-buttons">
          <SettingsBtn
            label="Off"
            callback={() => handleSoundSettings(false)}
            className={gameSettings.soundOnPress === false ? "active" : ""}
          />
          <SettingsBtn
            label="Alpacas"
            callback={() => {
              handleSoundSettings("Alpacas");
              playAudio("Main", "Alpacas");
            }}
            className={gameSettings.soundOnPress === "Alpacas" ? "active" : ""}
          />
          <SettingsBtn
            label="NovelKeys Cream"
            callback={() => {
              handleSoundSettings("NovelKeysCream");
              playAudio("Main", "NovelKeysCream");
            }}
            className={
              gameSettings.soundOnPress === "NovelKeysCream" ? "active" : ""
            }
          />
        </div>
      </div>
      <div className="settings-option typing-caret">
        <div className="option-content">
          <div className="option-title">
            <h4 className="Caret">| Caret</h4>
          </div>
          <p className="option-desc">Change style of yours caret</p>
        </div>
        <div className="option-buttons">
          <SettingsBtn
            label="Off"
            callback={() => handleCaretType(false)}
            className={!gameSettings.caretType && "active"}
          />
          <SettingsBtn
            label="|"
            callback={() => handleCaretType("default")}
            className={gameSettings.caretType === "default" && "active"}
          />
          <SettingsBtn
            label="_"
            callback={() => handleCaretType("under")}
            className={gameSettings.caretType === "under" && "active"}
          />
          <SettingsBtn
            label="▮"
            callback={() => handleCaretType("block")}
            className={gameSettings.caretType === "block" && "active"}
          />
        </div>
      </div>
      <div className="settings-option typing-caret-rainbow">
        <div className="option-content">
          <div className="option-title">
            <CiRainbow />
            <h4>Caret rainbow</h4>
          </div>
          <p className="option-desc">
            Set animated rainbow effect for the caret
          </p>
        </div>
        <div className="option-buttons">
          <SettingsBtn
            label="Off"
            callback={() => handleCaretRainbow(false)}
            className={!gameSettings.caretRainbow && "active"}
          />
          <SettingsBtn
            label="On"
            callback={() => handleCaretRainbow(true)}
            className={gameSettings.caretRainbow && "active"}
          />
        </div>
      </div>
      <div className="settings-option random-theme">
        <div className="option-content">
          <div className="option-title">
            <FaRandom />
            <h4>Random theme</h4>
          </div>
          <p className="option-desc">
            A random theme will be apply after every completed test <br />
            (new theme do not saves to yours config)
          </p>
        </div>
        <div className="option-buttons">
          <SettingsBtn
            label="Off"
            callback={() => handleRandomTheme(false)}
            className={!gameSettings.randomTheme && "active"}
          />
          <SettingsBtn
            label="On"
            callback={() => handleRandomTheme(true)}
            className={gameSettings.randomTheme && "active"}
          />
        </div>
      </div>
      <div className="settings-option sidebar">
        <div className="option-content">
          <div className="option-title">
            <BsLayoutSidebarInset />
            <h4>Themes sidebar</h4>
          </div>
          <p className="option-desc">Show themes sidebar</p>
        </div>
        <div className="option-buttons">
          <SettingsBtn
            label="Off"
            callback={() => handleThemesSidebar(false)}
            className={!gameSettings.themesSidebar && "active"}
          />
          <SettingsBtn
            label="On"
            callback={() => handleThemesSidebar(true)}
            className={gameSettings.themesSidebar && "active"}
          />
        </div>
      </div>
      <div className="settings-option words-history">
        <div className="option-content">
          <div className="option-title">
            <MdHistory />
            <h4>Words history</h4>
          </div>
          <p className="option-desc">
            Show your words history in the end of each test
          </p>
        </div>
        <div className="option-buttons">
          <SettingsBtn
            label="Off"
            callback={() => handleWordsHistory(false)}
            className={!gameSettings.wordsHistory && "active"}
          />
          <SettingsBtn
            label="On"
            callback={() => handleWordsHistory(true)}
            className={gameSettings.wordsHistory && "active"}
          />
        </div>
      </div>
      <div className="settings-option themes">
        <div className="option-content">
          <div className="option-title">
            <h4>Themes</h4>
          </div>
          <p className="option-desc">Change site theme</p>
        </div>
        <div className="option-buttons theme">
          {Object.keys(themes).map((value) => {
            return (
              <ThemeButton
                key={value}
                newTheme={value}
                className="option-btn theme-btn"
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default SettingsMain;

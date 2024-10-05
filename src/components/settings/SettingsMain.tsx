import { TbKeyboard } from "react-icons/tb";
import { CgLoadbarSound } from "react-icons/cg";
import { CiRainbow } from "react-icons/ci";

import { useTypeSettings } from "../../contexts/TypeSettingsContext";
import { playAudio } from "../../utils/playAudio";
import SettingsBtn from "./settingsBtn";
import { themes } from "../../themes/themes";
import ThemeButton from "../ThemeBtn";
import { FaRandom } from "react-icons/fa";
import { BsLayoutSidebarInset } from "react-icons/bs";

const SettingsMain = ({}) => {
  const { typeSettings, setTypeSettings } = useTypeSettings();

  const handleKeyboardSettings = (isShow: boolean, isResponsive = false) => {
    setTypeSettings({
      ...typeSettings,
      keyboard: {
        ...typeSettings.keyboard,
        show: isShow,
        responsive: isResponsive,
      },
    });
  };

  const handleSoundSettings = (soundStatus: boolean | string) => {
    setTypeSettings({
      ...typeSettings,
      soundOnPress: soundStatus,
    });
  };

  const handleCaretType = (caretType: boolean | string) => {
    setTypeSettings({
      ...typeSettings,
      caretType: caretType,
    });
  };

  const handleCaretRainbow = (caretRainbow: boolean) => {
    setTypeSettings({
      ...typeSettings,
      caretRainbow: caretRainbow,
    });
  };

  const handleRandomTheme = (randomTheme: boolean) => {
    setTypeSettings({
      ...typeSettings,
      randomTheme: randomTheme,
    });
  };

  const handleThemesSidebar = (themesSidebar: boolean) => {
    setTypeSettings({
      ...typeSettings,
      themesSidebar: themesSidebar,
    });
  };

  return (
    <div className="container">
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
            className={!typeSettings.keyboard.show ? "active" : ""}
          />
          <SettingsBtn
            label="Show"
            callback={() => handleKeyboardSettings(true, false)}
            className={typeSettings.keyboard.show ? "active" : ""}
          />
          <SettingsBtn
            label="Responsive"
            callback={() =>
              handleKeyboardSettings(true, !typeSettings.keyboard.responsive)
            }
            className={typeSettings.keyboard.responsive ? "active" : ""}
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
            className={typeSettings.soundOnPress === false ? "active" : ""}
          />
          <SettingsBtn
            label="Alpacas"
            callback={() => {
              handleSoundSettings("Alpacas");
              playAudio("/typingspeed/assets/sounds/Alpacas_main_soundmp3.mp3");
            }}
            className={typeSettings.soundOnPress === "Alpacas" ? "active" : ""}
          />
          <SettingsBtn
            label="NovelKeys Cream"
            callback={() => {
              handleSoundSettings("NovelKeysCream");
              playAudio(
                "/typingspeed/assets/sounds/NovelKeysCream_main_soundmp3.mp3"
              );
            }}
            className={
              typeSettings.soundOnPress === "NovelKeysCream" ? "active" : ""
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
            className={!typeSettings.caretType && "active"}
          />
          <SettingsBtn
            label="|"
            callback={() => handleCaretType("default")}
            className={typeSettings.caretType === "default" && "active"}
          />
          <SettingsBtn
            label="_"
            callback={() => handleCaretType("under")}
            className={typeSettings.caretType === "under" && "active"}
          />
          <SettingsBtn
            label="▮"
            callback={() => handleCaretType("block")}
            className={typeSettings.caretType === "block" && "active"}
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
            className={!typeSettings.caretRainbow && "active"}
          />
          <SettingsBtn
            label="On"
            callback={() => handleCaretRainbow(true)}
            className={typeSettings.caretRainbow && "active"}
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
            className={!typeSettings.randomTheme && "active"}
          />
          <SettingsBtn
            label="On"
            callback={() => handleRandomTheme(true)}
            className={typeSettings.randomTheme && "active"}
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
            className={!typeSettings.themesSidebar && "active"}
          />
          <SettingsBtn
            label="On"
            callback={() => handleThemesSidebar(true)}
            className={typeSettings.themesSidebar && "active"}
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
                value={value}
                className="option-btn theme-btn"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SettingsMain;

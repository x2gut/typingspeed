import { TbKeyboard } from "react-icons/tb";
import { CgLoadbarSound } from "react-icons/cg";

import { useTypeSettings } from "../../contexts/TypeSettingsContext";
import { playAudio } from "../../utils/playAudio";

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
          <button
            className={`option-btn ${
              !typeSettings.keyboard.show ? "active" : ""
            }`}
            onClick={() => handleKeyboardSettings(false)}
          >
            Off
          </button>
          <button
            className={`option-btn ${
              typeSettings.keyboard.show ? "active" : ""
            }`}
            onClick={() => handleKeyboardSettings(true, false)}
          >
            Show
          </button>
          <button
            className={`option-btn ${
              typeSettings.keyboard.responsive ? "active" : ""
            }`}
            onClick={() =>
              handleKeyboardSettings(true, !typeSettings.keyboard.responsive)
            }
          >
            Responsive
          </button>
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
          <button
            className={`option-btn ${
              typeSettings.soundOnPress === false ? "active" : ""
            }`}
            onClick={() => handleSoundSettings(false)}
          >
            Off
          </button>
          <button
            className={`option-btn ${
              typeSettings.soundOnPress === "Alpacas" ? "active" : ""
            }`}
            onClick={() => {
              handleSoundSettings("Alpacas");
              playAudio("/typingspeed/assets/sounds/Alpacas_main_soundmp3.mp3");
            }}
          >
            Alpacas
          </button>
          <button
            className={`option-btn ${
              typeSettings.soundOnPress === "NovelKeysCream" ? "active" : ""
            }`}
            onClick={() => {
              handleSoundSettings("NovelKeysCream");
              playAudio(
                "/typingspeed/assets/sounds/NovelKeysCream_main_soundmp3.mp3"
              );
            }}
          >
            NovelKeys Cream
          </button>
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
          <button
            className={`option-btn ${!typeSettings.caretType && "active"}`}
            onClick={() => handleCaretType(false)}
          >
            Off
          </button>
          <button
            className={`option-btn ${
              typeSettings.caretType === "default" && "active"
            }`}
            onClick={() => handleCaretType("default")}
          >
            |
          </button>
          <button
            className={`option-btn ${
              typeSettings.caretType === "under" && "active"
            }`}
            onClick={() => handleCaretType("under")}
          >
            _
          </button>
          <button
            className={`option-btn ${
              typeSettings.caretType === "block" && "active"
            }`}
            onClick={() => handleCaretType("block")}
          >
            ▮
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsMain;

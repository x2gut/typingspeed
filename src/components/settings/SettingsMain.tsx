import { useTypeSettings } from "../../contexts/TypeSettingsContext";

const SettingsMain = ({}) => {
  const { typeSettings, setTypeSettings } = useTypeSettings();

  const config = localStorage.getItem("config")
    ? JSON.parse(localStorage.getItem("config") as string)
    : null;

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

  console.log(config);
  return (
    <div className="container">
      <div className="settings-top">
        <h2 className="settings-title my-20 text-4xl">Settings</h2>
      </div>
      <div className="settings-option keyboard">
        <div className="option-content">
          <h4 className="option-title">Keyboard</h4>
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
            onClick={() => handleKeyboardSettings(true, !typeSettings.keyboard.responsive)}
          >
            Responsive
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsMain;

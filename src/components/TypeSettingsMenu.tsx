import { useState } from "react";
import { TypeSettings } from "../types/types";
import { useTypeSettings } from "../contexts/TypeSettingsContext";

interface TypeSettingsMenuProps {
  className: string;
}

const TypeSettingsMenu:React.FC<TypeSettingsMenuProps> = ({ className }) => {
  const { typeSettings, setTypeSettings } = useTypeSettings();

  const { mode, time, words } = typeSettings;

  return (
    <div className={`type-settings my-10 flex justify-center transition-opacity ${className}`}>
      <div className="mode flex gap-5 justify-center rounded-md p-2">
        <button
          className={mode === "words" ? "mode-btn mode-active" : "mode-btn"}
          onClick={() =>
            setTypeSettings((prevData) => ({
              ...prevData,
              mode: "words",
            }))
          }
        >
          Words
        </button>
        <button
          className={mode === "time" ? "mode-btn mode-active" : "mode-btn"}
          onClick={() => {
            setTypeSettings((prevData) => ({
              ...prevData,
              mode: "time",
            }));
          }}
        >
          Time
        </button>
        <div className="vertical-separator h-full w-1 bg-gray-900 rounded-xl opacity-50"></div>
        <div className="mode-settings">
          {mode === "time" ? (
            <div className="time-settings flex gap-3">
              <button
                onClick={() =>
                  setTypeSettings((prevData) => ({
                    ...prevData,
                    time: 15,
                  }))
                }
                className={time === 15 ? "mode-active" : ""}
              >
                15
              </button>
              <button
                onClick={() =>
                  setTypeSettings((prevData) => ({
                    ...prevData,
                    time: 30,
                  }))
                }
                className={time === 30 ? "mode-active" : ""}
              >
                30
              </button>
              <button
                onClick={() =>
                  setTypeSettings((prevData) => ({
                    ...prevData,
                    time: 60,
                  }))
                }
                className={time === 60 ? "mode-active" : ""}
              >
                60
              </button>
            </div>
          ) : (
            <div className="words-settings flex gap-3">
              <button
                onClick={() =>
                  setTypeSettings((prevData) => ({
                    ...prevData,
                    words: 25,
                  }))
                }
                className={words === 25 ? "mode-active" : ""}
              >
                25
              </button>
              <button
                onClick={() =>
                  setTypeSettings((prevData) => ({
                    ...prevData,
                    words: 50,
                  }))
                }
                className={words === 50 ? "mode-active" : ""}
              >
                50
              </button>
              <button
                onClick={() =>
                  setTypeSettings((prevData) => ({
                    ...prevData,
                    words: 100,
                  }))
                }
                className={words === 100 ? "mode-active" : ""}
              >
                100
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypeSettingsMenu;

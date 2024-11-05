import React, { useEffect, useState } from "react";
import ResponsiveLetter from "./ResponsiveLetter";
import useKeyPressed from "../../../hooks/useKeyPressed";
import {
  engKeyboardKeys,
  uaKeyboardKeys,
  rusKeyboardKeys,
} from "../../../static/keyboardsLayouts";
import useSettingsStore from "../../../store/settings-store";

interface KeyboardProps {
  isFocused: boolean;
  isResponsive: boolean;
}

const Keyboard: React.FC<KeyboardProps> = (() => {
  const { keyPressed } = useKeyPressed();
  const [layout, setLayout] = useState<string[][]>(engKeyboardKeys);
  const { gameSettings } = useSettingsStore();

  useEffect(() => {
    switch (gameSettings.layout) {
      case "russian":
        setLayout(rusKeyboardKeys);
        break;
      case "english":
        setLayout(engKeyboardKeys);
        break;
      case "ukrainian":
        setLayout(uaKeyboardKeys);
        break;
    }
  }, [gameSettings.layout]);

  return (
    <div className="keyboard flex gap-2 flex-col">
      {layout.map((keyboardRow, index) => (
        <ul className="keyboard-row" key={index}>
          {keyboardRow.map((key) => (
            <ResponsiveLetter
              key={key}
              keyLabel={key}
              pressedKey={keyPressed}
            />
          ))}
        </ul>
      ))}
    </div>
  );
});

export default Keyboard;

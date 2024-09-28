import React, { useEffect, useState } from "react";
import ResponsiveLetter from "./ResponsiveLetter";
import useKeyPressed from "../../../hooks/useKeyPressed";
import { useTypeSettings } from "../../../contexts/TypeSettingsContext";
import { engKeyboardKeys } from "../../../static/keyboardsLayouts";
import { rusKeyboardKeys } from "../../../static/keyboardsLayouts";


interface KeyboardProps {
  isFocused: boolean;
  isResponsive: boolean;
}

const Keyboard: React.FC<KeyboardProps> = React.memo(
  ({ isFocused, isResponsive }) => {
    const { keyPressed } = useKeyPressed();
    const [pressedKeysArr, setPressedKeyArr] = useState<string[]>([]);
    const [layout, setLayout] = useState<string[][]>(engKeyboardKeys);
    const { typeSettings } = useTypeSettings();

    useEffect(() => {
      switch (typeSettings.layout) {
        case "russian":
          setLayout(rusKeyboardKeys);
          break;
        case "english":
          setLayout(engKeyboardKeys);
          break;
      }
    }, [typeSettings.layout]);

    useEffect(() => {
      if (isFocused && isResponsive) {
        setPressedKeyArr((prevData) => {
          const updatedData = [...prevData, keyPressed];

          if (updatedData.length > 2) {
            return updatedData.slice(1);
          }
          return updatedData;
        });
      }
    }, [keyPressed]);

    return (
      <div className="keyboard flex gap-2 flex-col">
        {layout.map((keyboardRow, index) => (
          <ul className="keyboard-row" key={index}>
            {keyboardRow.map((key) => (
              <ResponsiveLetter
                key={key}
                keyLabel={key}
                pressedKeysArr={pressedKeysArr}
              />
            ))}
          </ul>
        ))}
      </div>
    );
  }
);

export default Keyboard;

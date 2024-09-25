import React, { useEffect, useState } from "react";
import ResponsiveLetter from "./ResponsiveLetter";
import useKeyPressed from "../../../hooks/useKeyPressed";

const keyboardKeys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
  ["space"],
];

interface KeyboardProps {
  isFocused: boolean;
  isResponsive: boolean
}

const Keyboard: React.FC<KeyboardProps> = React.memo(({ isFocused, isResponsive }) => {
  const { keyPressed } = useKeyPressed();
  const [pressedKeysArr, setPressedKeyArr] = useState<string[]>([]);

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
      {keyboardKeys.map((keyboardRow, index) => (
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
});

export default Keyboard;

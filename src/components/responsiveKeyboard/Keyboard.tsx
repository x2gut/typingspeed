import React, { useEffect, useState } from "react";
import useKeyPressed from "../../hooks/useKeyPressed";
import ResponsiveLetter from "./ResponsiveLetter";

const keyboardKeys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
  ["space"],
];

interface KeyboardProps {
  isFocused: boolean;
}

const Keyboard: React.FC<KeyboardProps> = React.memo(({ isFocused }) => {
  const { keyPressed, setKeyPressed } = useKeyPressed();
  const [pressedKeysArr, setPressedKeyArr] = useState<string[]>([]);

  useEffect(() => {
    console.log(pressedKeysArr)
    console.log(keyPressed)
    if (!keyPressed) return;

    setPressedKeyArr((prevData) => {
      const updatedData = [...prevData, keyPressed];

      if (updatedData.length > 2) {
        return updatedData.slice(1);
      }
      return updatedData;
    });
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

import React, { useMemo } from "react";

interface ResponsiveLetterProps {
  keyLabel: string;
  pressedKeysArr: string[];
}

const ResponsiveLetter: React.FC<ResponsiveLetterProps> = React.memo(({ keyLabel, pressedKeysArr }) => {
  const isPressed = keyLabel === "space" ? pressedKeysArr.includes(" ") : pressedKeysArr.includes(keyLabel);

  const memorizedLetter = useMemo(() => {
    return (
      <li className={`key ${isPressed ? "keyboard-animation" : ""}`} key={keyLabel}>
        {keyLabel === "space" ? (
          <span className="w-52 block text-center">{keyLabel}</span>
        ) : (
          <span>{keyLabel}</span>
        )}
      </li>
    );
  }, [pressedKeysArr, keyLabel])
  return memorizedLetter;
});

export default ResponsiveLetter;

import React from "react";
import { animated, useSpring } from "react-spring";

interface ResponsiveLetterProps {
  keyLabel: string;
  pressedKey: string;
}

const ResponsiveLetter: React.FC<ResponsiveLetterProps> = ({
  keyLabel,
  pressedKey,
}) => {
  const isPressed =
    pressedKey === keyLabel;

  const animationProps = useSpring({
    backgroundColor: isPressed ? "var(--main-color)" : "var(--bg-color)",
    config: { duration: 125 },
  });

  return (
    <animated.li className={`key`} style={animationProps}>
      {keyLabel === " " ? (
        <span className="w-52 h-6 block text-center">{keyLabel}</span>
      ) : (
        <span>{keyLabel}</span>
      )}
    </animated.li>
  );
};

export default ResponsiveLetter;

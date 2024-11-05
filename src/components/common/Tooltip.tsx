import { FC, ReactElement, useState } from "react";
import { useSpring, animated } from "react-spring";

interface TooltipProps {
  children: ReactElement;
  tooltipLabel: string;
}

const Tooltip: FC<TooltipProps> = ({ children, tooltipLabel }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const animationProps = useSpring({
    opacity: isVisible && !isClosing ? 1 : 0,
    transform:
      isVisible && !isClosing
        ? "translate(-50%, 28px)"
        : "translate(-50%, 38px)",
    config: { duration: 200, tension: 100 },
    onRest: () => {
      if (isClosing) {
        setIsVisible(false);
        setIsClosing(false);
      }
    },
  });

  return (
    <div className="tooltip relative">
      <div
        className="tooltip-content"
        onMouseEnter={() => {
          setIsVisible(true);
          setIsClosing(false);
        }}
        onMouseLeave={() => {
          setIsClosing(true);
        }}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsClosing(true)}
        tabIndex={0}
      >
        {children}
        {isVisible && (
          <animated.div
            style={animationProps}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 "
          >
            <span className="tooltip-triangle absolute bottom-[25px] left-1/2 -translate-x-1/2 bg-[#101010f2] brightness-110 w-3 h-3"></span>
            <span
              className="bg-[#101010f2] brightness-110 text-white p-2 rounded"
              onMouseEnter={() => setIsVisible(false)}
            >
              {tooltipLabel}
            </span>
          </animated.div>
        )}
      </div>
    </div>
  );
};

export default Tooltip;

import React, { ReactNode, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { CiCircleInfo } from "react-icons/ci";
import { MdNearbyError } from "react-icons/md";
import { PiThumbsUpBold } from "react-icons/pi";

interface NoticeComponentProps {
  message: string;
  noticeType?: "success" | "error" | "info";
  duration?: number;
  onDismiss: () => void;
}

const NoticeComponent: React.FC<NoticeComponentProps> = ({
  message,
  noticeType = "info",
  duration = 5000,
  onDismiss,
}) => {
  const styles = {
    success: {
      bg: "bg-green-300 border-green-500 text-green-600",
      icon: <PiThumbsUpBold />,
      text: "text-green-600",
    },
    error: {
      bg: "bg-red-300 border-red-500 text-red-600",
      icon: <MdNearbyError />,
      text: "text-red-600",
    },
    info: {
      bg: "bg-blue-300 border-blue-500 text-blue-600",
      icon: <CiCircleInfo />,
      text: "text-blue-600",
    },
  };

  const currentStyle = styles[noticeType] || styles.info;

  const [style, api] = useSpring(() => ({
    opacity: 0,
    transform: "translateY(-20px)",
  }));

  useEffect(() => {
    api.start({ opacity: 1, transform: "translateY(0)" });

    const timer = setTimeout(() => {
      api.start({ opacity: 0, transform: "translateY(-20px)" });
      setTimeout(onDismiss, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [api, duration, onDismiss]);

  return (
    <animated.div
      style={{
        ...style,
        minWidth: "200px",
        maxWidth: "320px",
      }}
      onClick={() => {
        api.start({ opacity: 0, transform: "translateY(-20px)" });
        setTimeout(onDismiss, 500);
      }}
    >
      <div
        className={`rounded-lg p-3 border-2 cursor-pointer hover:brightness-90 transition-all duration-200 ${currentStyle.bg}`}
      >
        <div className={`${currentStyle.text} flex items-center gap-1`}>
          {currentStyle.icon}
          <span className="font-semibold">{noticeType}</span>
        </div>
        <p className="text-white break-words">{message}</p>
      </div>
    </animated.div>
  );
};

export default NoticeComponent;

import React from "react";
import { TooltipProps } from "recharts";
import { useTheme } from "../../../../contexts/ThemeProvider";

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    const { colors } = useTheme();
    return (
      <div
        className="custom-tooltip"
        style={{
          color: colors.correctTextColor,
          backgroundColor: "rgba(60, 61, 55, 0.5)",
          opacity: "1",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        <p className="label">{`Second: ${payload[0].payload.second}`}</p>
        <p className="raw-wpm">
          <span
            style={{
              color: colors.subColor,
            }}
          >
            raw
          </span>{" "}
          {payload[0].payload.rawWpm}
        </p>
        <p className="wpm" style={{ color: colors.correctTextColor }}>
          <span
            style={{
              color: colors.mainColor,
            }}
          >
            WPM
          </span>{" "}
          {payload[0].payload.wpm}
        </p>
        <p className="mistakes">
          <span
            style={{
              color: colors.mistakeColor,
            }}
          >
            Mistakes
          </span>{" "}
          {payload[0].payload.mpm}
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;

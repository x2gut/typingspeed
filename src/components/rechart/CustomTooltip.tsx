import React from "react";
import { TooltipProps } from "recharts";

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          color: "white",
          backgroundColor: "transparent",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        <p className="label">{`Second: ${payload[0].payload.second}`}</p>
        <p className="wpm"><span style={{
            color: "#facc15"
        }}>WPM</span> {payload[0].payload.wpm}</p>
        <p className="mistakes"><span style={{
            color: "#be123c"
        }}>Mistakes</span> {payload[0].payload.mpm}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;

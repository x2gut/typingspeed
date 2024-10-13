import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import { useTheme } from "../../../../contexts/ThemeProvider";

interface LineChartProps {
  data: { second: number; wpm: number; mpm: number }[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const { colors } = useTheme();
  const mistakesData = data.filter((item) => item.mpm > 0);
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight="200px">
      <RechartsLineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="second" stroke={colors.subColor} />
        <YAxis stroke={colors.subColor} />
        <Tooltip content={CustomTooltip} />
        <Line
          className="line-chart"
          type="monotone"
          dataKey="wpm"
          stroke={colors.mainColor}
          activeDot={{ r: 0 }}
          dot={false}
        />
        {mistakesData.map((entry) => (
          <ReferenceDot
            x={entry.second}
            y={entry.wpm}
            stroke={colors.mistakeColor}
            strokeWidth={1}
            fill="transparent"
            r={4}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;

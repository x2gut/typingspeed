import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  CartesianGrid,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import { useTheme } from "../../../../contexts/ThemeProvider";
import CustomReferenceDot from "./customDot";

interface LineChartProps {
  data: { second: number; wpm: number; mpm: number, rawWpm: number }[];
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
      <CartesianGrid stroke="var(--sub-color)" strokeOpacity={0.25} vertical={false} strokeDasharray="4 10"/>
        <XAxis dataKey="second" stroke={colors.subColor} domain={[1, "dataMax"]}/>
        <YAxis stroke={colors.subColor} />
        <Tooltip content={CustomTooltip} />
        <Line
          className="line-chart"
          type="monotone"
          dataKey="wpm"
          stroke={colors.mainColor}
          strokeWidth={3}
          r={0}
          activeDot={false}
        />
        <Line
          className="line-chart"
          type="monotone"
          dataKey="rawWpm"
          stroke={colors.textColor}
          strokeWidth={3}
          r={0}
          activeDot={false}
        />
        {mistakesData.map((entry) => (
          <ReferenceDot
            r={0}
            x={entry.second}
            y={entry.rawWpm}
            stroke={colors.mistakeColor}
            strokeWidth={1}
            fill="var(--mistake-color)"
            shape={<CustomReferenceDot/>}          
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;

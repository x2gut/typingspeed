import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
import CustomTooltip from "./rechart/CustomTooltip";
import { CustomReferenceDot } from "./rechart/customShape";

interface LineChartProps {
  data: { second: number; wpm: number; mpm: number }[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
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
        <XAxis dataKey="second" />
        <YAxis />
        <Tooltip content={CustomTooltip} />
        <Line
          type="monotone"
          dataKey="wpm"
          stroke="#facc15"
          activeDot={{ r: 0 }}
          dot={false}
        />
        {mistakesData.map((entry) => (
            <ReferenceDot
            x={entry.second}
            y={entry.wpm}
            stroke="red"
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

import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Cell,
  Tooltip
} from "recharts";

export default props => {
  return (
    <BarChart
      width={300}
      height={150}
      data={[
        { sentiment: "Positive", count: props.positive },
        { sentiment: "Neutral", count: props.neutral },
        { sentiment: "Negative", count: props.negative }
      ]}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="sentiment" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count">
        <Cell fill="#249688" />
        <Cell fill="#f8a932" />
        <Cell fill="#e74858" />
      </Bar>
    </BarChart>
  );
};

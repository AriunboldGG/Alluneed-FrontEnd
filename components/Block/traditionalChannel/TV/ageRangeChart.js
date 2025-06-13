import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const AGE_COLORS = ["#4472C4", "#ED7D31", "#A5A5A5", "#FFC000"];

// Custom label function
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#333"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={16}
      fontWeight={500}
    >
      {percent > 0 ? `${(percent * 100).toFixed(0)}%` : ""}
    </text>
  );
};

const AgePieChart = ({ ageData = [] }) => {
  if (!ageData || ageData.length === 0) return <div>No data</div>;
  return (
    <PieChart width={250} height={250}>
      <Pie
        data={ageData}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label={renderCustomizedLabel}
      >
        {ageData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default AgePieChart;
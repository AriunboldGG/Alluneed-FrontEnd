import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#FF8042"]; // Blue for Male, Orange for Female

// Custom label function for percentage
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

const GenderPieChart = ({ data }) => {
  // If you want to use static data, you can skip the reduce part and just use:
  const genderData = [
    { name: "Man", value: 36 },
    { name: "Woman", value: 64 },
  ];

  return (
    <PieChart width={250} height={250}>
      <Pie
        data={genderData}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label={renderCustomizedLabel}
      >
        {genderData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default GenderPieChart;
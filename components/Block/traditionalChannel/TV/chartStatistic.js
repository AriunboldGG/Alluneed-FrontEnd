import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatisticsChart = ({ data }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (!Array.isArray(data)) return;

    setChartData({
      labels: data.map(item => item.name), // e.g. ["UB", "Erdenet", ...]
      datasets: [
        {
          label: 'Location',
          data: data.map(item => item.value), // e.g. [65, 18, ...]
          backgroundColor: '#4472C4',
        },
      ],
    });
  }, [data]);

  return (
    <div className="statisticsChart">
      {chartData.labels && chartData.labels.length > 0 ? (
        <Bar
          data={chartData}
          options={{
            plugins: {
              legend: { display: true, position: 'bottom' },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${context.parsed.y}%`;
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 70,
                ticks: {
                  callback: function(value) {
                    return value + '%';
                  }
                }
              }
            }
          }}
        />
      ) : (
        <p>Хоосон байна.</p>
      )}
    </div>
  );
};

export default StatisticsChart;
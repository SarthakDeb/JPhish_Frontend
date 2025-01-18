import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // ...
  };

const LineChart = ({ data, options }) => {
    const mergedOptions = { ...lineOptions, ...options };

  return (
    <div className="w-[500px] h-[220px]">
      <Line data={data} options={lineOptions}  />
    </div>
  );
};

export default LineChart;
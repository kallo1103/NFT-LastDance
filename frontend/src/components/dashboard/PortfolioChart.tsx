'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PortfolioChartProps {
  data: ChartData<'line'>;
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Portfolio Value',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        callback: (value: any) => `$${value}`,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 0,
    },
  },
};

export function PortfolioChart({ data }: PortfolioChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <Line options={options} data={data} />
    </div>
  );
} 
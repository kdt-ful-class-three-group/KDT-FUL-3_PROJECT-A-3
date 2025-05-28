import { StockChartProps} from '@/types/stock';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

import styles from './StockStyles.module.css'

export function StockChart({ data, symbol }: StockChartProps) {

  
  const chartData = {
    labels: data.map(item => item.datetime),
    datasets: [
      {
        label: `${symbol} 종가`,
        data: data.map(item => item.close),
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: `${symbol} 주가 차트` },
    },
  };

  return (
    <div>
      <div>
        <h1>{}</h1>
      </div>
      <div className={styles.chart}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}
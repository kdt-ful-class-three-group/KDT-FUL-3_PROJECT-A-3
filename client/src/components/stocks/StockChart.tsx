import styles from './StockStyles.module.css'
import { StockChartProps } from '@/types/stock';
import { ChartOptions } from 'chart.js';
import { Tick } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarElement,      // ✅ Bar 차트 요소
  BarController 
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarElement,
  BarController
);


export function StockChart({ data, symbol }: StockChartProps) {

  const changes = data.map((item, index) => {
    if (index === 0) return 0;
    const currentClose = Number(item.close);
    const prevClose = Number(data[index - 1].close);
    return currentClose - prevClose;
  });
  
  const barColors = changes.map(change => change >= 0 ? 'red' : 'blue');
  
  const chartData = {
    labels: Array.from(new Set(data.map(item => item.datetime.slice(0, 10)))),
    datasets: [
      {
        label: `${symbol} 전일 대비 등락폭`,
        data: changes,
        backgroundColor: barColors,
      },
    ],
  };

  console.log(chartData.labels)

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true, // 화면 크기에 따라 자동 반응형
    plugins: {
      legend: {
        position: 'top' as const, // 범례 위치: 위쪽
      },
      title: {
        display: true,
        text: `${symbol} 주가 등락폭 차트`, // 차트 제목
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function(value: any, index: number, ticks: Tick[]) {
            const label = ticks[index]?.label;
            return label?.slice(5); // "MM-DD" 형식
          }
        }
      },
      y: {
        ticks: {
          callback: function(value: any) {
            return Number(value).toLocaleString() + '원'; // 금액 단위 표시
          }
        }
      }
    }
  };

  return (
    <div>
      <div>
        <h1>{}</h1>
      </div>
      <div className={styles.chart}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}
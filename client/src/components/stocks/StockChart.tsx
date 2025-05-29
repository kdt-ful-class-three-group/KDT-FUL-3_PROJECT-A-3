'use client'
import { useMemo } from 'react';
import { format } from 'date-fns';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import { ChartOptions } from 'chart.js';
import 'chartjs-adapter-date-fns';

// ✅ 이 줄로 모든 필요한 모듈을 등록
ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  Tooltip,
  Legend,
  CandlestickController,
  CandlestickElement
);

import styles from './StockStyles.module.css'

export function StockChart({ stockData }: { stockData: any[] }) {
  
  const formattedData = useMemo(() => {
    const grouped: { [date: string]: any[] } = {};

    stockData.forEach(item => {
      const date = item.datetime.slice(0, 10); // YYYY-MM-DD
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
    });

    return Object.entries(grouped).map(([date, items]) => ({
      x: new Date(date),
      o: Number(items[0].open),
      h: Math.max(...items.map(i => Number(i.high))),
      l: Math.min(...items.map(i => Number(i.low))),
      c: Number(items[items.length - 1].close ?? items[items.length - 1].price),
    }));
  }, [stockData]);

  console.log(formattedData.map(d => d.x));
  const data = {
    datasets: [
      {
        label: '봉차트',
        data: formattedData,
        barThickness: 20,
        color: {
          up: 'red',
          down: 'blue',
          unchanged: 'gray'
        }
      }
    ]
  };

  const options: ChartOptions<'candlestick'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MM/dd'
          }
        },
        ticks: {
          source: 'auto',
          autoSkip: false,
          maxRotation: 20,
          minRotation: 20,
          font: {
            size: 10
          },
          callback: function (tickValue) {
            const date = new Date(tickValue);
            if (!isNaN(date.getTime())) {
              return format(date, 'MM/dd');
            }
            return '';
          }
        }
      },
      y: {
        beginAtZero: false,
        position: 'right'
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.chart}>
        <Chart type="candlestick" data={data} options={options} />
      </div>
    </div>
  );
}

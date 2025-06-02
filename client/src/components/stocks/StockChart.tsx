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

export function StockChart({ data: stockData, symbol }: { data: any[], symbol: string }) {
  const formattedData = useMemo(() => {
    return stockData.map(item => ({
      x: new Date(item.datetime),
      o: Number(item.open),
      h: Number(item.high),
      l: Number(item.low),
      c: Number(item.close ?? item.price),
    })).sort((a, b) => a.x.getTime() - b.x.getTime());
  }, [stockData]);

  console.log("formattedData", formattedData);

  const data = {
    datasets: [
      {
        label: '봉차트',
        data: formattedData,
        barThickness: 4,
        color: {
          up: 'red',
          down: 'blue',
          unchanged: 'gray'
        }
      }
    ]
  };

  console.log("Chart에 전달하는 data 객체", data);

  // @ts-ignore
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
          unit: 'minute',
          displayFormats: {
            minute: 'MM/dd HH:mm'
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

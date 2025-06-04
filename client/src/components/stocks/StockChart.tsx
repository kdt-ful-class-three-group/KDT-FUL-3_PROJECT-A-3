'use client'
import { useMemo } from 'react';
import { format } from 'date-fns';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import { ChartOptions } from 'chart.js';
import 'chartjs-adapter-date-fns';

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
    const grouped: { [date: string]: any[] } = {};

    stockData.forEach(item => {
      if (!item || !item.datetime) return;
      const date = item.datetime.slice(0, 16); // YYYY-MM-DDTHH:mm (5분 단위 그룹화 대비)
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

  console.log("formattedData", formattedData);

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

  console.log("Chart에 전달하는 data 객체", data);

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

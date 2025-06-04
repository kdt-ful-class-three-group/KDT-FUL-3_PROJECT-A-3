'use client'

import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';
import { StockValue} from '@/types/stock';
import { format } from 'date-fns';



export default function StockChart({ data, symbol }: { data: StockValue[], symbol: string }) {
  const chartRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    if (!chartRef.current || !data || data.length === 0) return;
    const sortedData = [...data].sort((a, b) =>
        new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    );

    const chart = echarts.init(chartRef.current);


    const option = {
      title: {
        text: `${symbol} 차트`,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      xAxis: {
        type: 'category',
        data: sortedData.map(item =>
            format(new Date(item.datetime), 'MM/dd HH:mm')
        ),
        scale: true,
        boundaryGap: true,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax'
      },
      yAxis: {
        scale: true,
        splitArea: { show: true }
      },
      series: [
        {
          name:symbol,
          type: 'candlestick',
          data: sortedData.map(item => [item.open, item.close, item.low, item.high]),
          itemStyle: {
            color: '#ef5350',     // 상승 색
            color0: '#42a5f5',    // 하락 색
            borderColor: '#ef5350',
            borderColor0: '#42a5f5'
          }
        }
      ]
    };

    chart.setOption(option);



    return () => {
      chart.dispose();
    };
  }, [data]);
  console.log("차트용 데이터:", data);
  return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
}
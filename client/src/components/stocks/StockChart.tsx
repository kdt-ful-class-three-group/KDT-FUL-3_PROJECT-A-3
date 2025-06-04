'use client'

import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';
import { StockValue } from '@/types/stock';
import { format } from 'date-fns';

// 차트 컴포넌트 정의. props로 주식 데이터 배열과 심볼을 받음
export default function StockChart({ data, symbol }: { data: StockValue[], symbol: string }) {
  const chartRef = useRef<HTMLDivElement>(null); // 차트가 렌더링될 DOM 요소 참조
  const [visibleDataCount, setVisibleDataCount] = useState(() => {
    // 컴포넌트 마운트 시, 현재 시간까지의 데이터 개수를 초기값으로 설정
    const now = new Date();
    return data.filter(d => new Date(d.datetime) <= now).length;
  });

  useEffect(() => {
    // 차트 DOM 요소나 데이터가 없으면 중단
    if (!chartRef.current || !data || data.length === 0) return;

    // 보여줄 데이터만 추출하고 정렬 (시간 오름차순)
    const slicedData = data.slice(0, visibleDataCount);
    const sortedData = [...slicedData].filter(item => item && item.datetime).sort((a, b) =>
        new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    );

    // 차트 인스턴스 초기화
    const chart = echarts.init(chartRef.current);

    // 차트 옵션 구성
    const option = {
      title: {
        text: `${symbol} 차트`, // 차트 제목
        left: 'center' // 가운데 정렬
      },
      tooltip: {
        trigger: 'axis', // X축 기준으로 툴팁 표시
        axisPointer: {
          type: 'cross' // 십자형 가이드라인
        }
      },
      xAxis: {
        type: 'category', // 시간 카테고리 축
        data: sortedData.map(item =>
            format(new Date(item.datetime), 'MM/dd HH:mm') // 날짜 포맷 변경
        ),
        scale: true,
        boundaryGap: true,
        axisLine: { onZero: false }, // Y=0과 맞추지 않음
        splitLine: { show: false }, // 수직선 숨김
        min: 'dataMin',
        max: 'dataMax'
      },
      yAxis: {
        scale: true, // 자동 스케일
        splitArea: { show: true } // 배경을 구역으로 나눔
      },
      series: [
        {
          name: symbol,
          type: 'candlestick', // 캔들차트 사용
          data: sortedData.map(item => [item.open, item.close, item.low, item.high]), // OHLC 순서
          itemStyle: {
            color: '#ef5350',       // 상승 캔들 색
            color0: '#42a5f5',      // 하락 캔들 색
            borderColor: '#ef5350',
            borderColor0: '#42a5f5'
          }
        }
      ]
    };

    // 차트에 옵션 적용
    chart.setOption(option);

    // 언마운트 시 차트 제거 (메모리 누수 방지)
    return () => {
      chart.dispose();
    };
  }, [data, visibleDataCount]); // 데이터나 visibleDataCount 변경 시 재렌더

  useEffect(() => {
    // 모든 데이터를 다 보여줬으면 중단
    if (!data || visibleDataCount >= data.length) return;

    // 100초마다 데이터 한 개씩 보여주는 방식
    const interval = setInterval(() => {
      setVisibleDataCount(prev => Math.min(prev + 1, data.length)); // 보이는 개수 +1
    }, 100000); // 100초 간격 (테스트 시엔 더 짧게 조정 가능)

    // 언마운트 시 인터벌 제거
    return () => clearInterval(interval);
  }, [data, visibleDataCount]); // 데이터나 보여줄 개수 바뀔 때마다 실행

  console.log("차트용 데이터:", data); // 디버깅용 로그 출력

  // 차트가 렌더링될 DOM 요소
  return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
}
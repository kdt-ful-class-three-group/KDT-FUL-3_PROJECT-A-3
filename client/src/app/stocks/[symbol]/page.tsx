'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { StockChart } from "@/components/stocks/StockChart"
import { StockInfo } from "@/components/stocks/StockInfo"
import { StockData } from "@/types/stock"
import { StockTradeButton } from "@/components/stocks/StockTradeButton"

import axios from "axios"

export default function StockPage() {
  const { symbol } = useParams() as { symbol: string };
  const [stockData, setStockData] = useState<StockData | null>(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchStockData = async () => {
      try {
        const res = await axios.get<StockData>(`http://localhost:8008/stocks/${symbol}`);
        setStockData(res.data);
      } catch (error) {
        console.error('주식 데이터를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchStockData();
  }, [symbol]);

  if (!stockData) return <div>주식불러오는중...</div>;

  return (
    <div>
      <div>
        <StockInfo
          symbol={stockData.meta.symbol}
          price={stockData.values[0]?.close}
        />
        <StockChart
          stockData={stockData?.values || []}
        />
      </div>
      <div>
        {stockData.values[0]?.close !== undefined && (
          <StockTradeButton symbol={symbol} price={Number(stockData.values[0].close)} />
        )}
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { StockChart } from "@/components/stocks/StockChart"
import { Button } from "@/components/common/Button"
import { StockInfo } from "@/components/stocks/StockInfo"
import { StockData } from "@/types/stock"

import axios from "axios"

export default function StockPage() {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState<StockData | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!symbol) return;
    axios.get<StockData>(`http://localhost:8008/stocks/${symbol}`)
      .then(res => setStockData(res.data))
      .catch(console.error);
  }, [symbol])

  if (!stockData) return <div>주식불러오는중...</div>;

  return (
    <div>
      <div>
        <Button
          name="뒤로가기"
          onClick={() => router.back()}
        />
      </div>
      <div>
        <StockInfo
          symbol={stockData.meta.symbol}
          price={stockData.values[0]?.close}
        />
        <StockChart
          stockData={stockData?.values || []}
        />
      </div>
    </div>
  )
}
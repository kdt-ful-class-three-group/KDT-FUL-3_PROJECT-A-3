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
  const params = useParams();
  const symbol = (params?.symbol ?? '') as string;
  const [stockData, setStockData] = useState<StockData  | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!symbol) return;
    axios.get<StockData>(`http://localhost:8008/stocks/${symbol}`)
      .then(res => setStockData(res.data))
      .catch(console.error);
  }, [symbol])

  console.log('StockPage', symbol, stockData);

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
            symbol={stockData.symbol ?? 'UNKNOWN'}
            price={stockData.close}
        />
        <StockChart data={stockData.values} symbol={stockData.symbol} />
      </div>
    </div>
  )
}
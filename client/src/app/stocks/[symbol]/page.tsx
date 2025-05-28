'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import axios from "axios"

export default function StockPage() {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    if (!symbol) return;
    axios.get(`http://localhost:8008/stocks/${symbol}`)
      .then(res => setStockData(res.data))
      .catch(console.error);
  }, [symbol])

  if (!stockData) return <div>주식불러오는중...</div>;

  return (
    <div>
      <pre>{JSON.stringify(stockData, null, 2)}</pre>
      <p>차트출력</p>

      {/* chart.js 사용하면됨 */}
    </div>
  )
}
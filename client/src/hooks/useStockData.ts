import { useEffect, useState } from "react"
import axios from "axios"
import { StockData } from "@/types/stock"

export function useStockData(symbol: string) {
  const [stockData, setStockData] = useState<StockData | null>(null)
  const [lastDatetime, setLastDatetime] = useState<string | null>(null)

  // 초기 데이터 불러오기
  useEffect(() => {
    axios.get<StockData>(`${process.env.NEXT_PUBLIC_URL}/stocks/${symbol}`)
      .then(res => {
        setStockData(res.data)
        setLastDatetime(res.data.values.at(-1)?.datetime ?? null)
      })
      .catch(console.error)
  }, [symbol])

  // 실시간 추가 데이터 갱신
  useEffect(() => {
    if (!lastDatetime) return;

    const interval = setInterval(() => {
      const now = new Date().toISOString()

      axios.get<StockData>(`${process.env.NEXT_PUBLIC_URL}/stocks/${symbol}?fromKST=${lastDatetime}&toKST=${now}`)
        .then(res => {
          if (res.data.values.length > 0) {
            setStockData(prev => {
              if (!prev) return res.data
              return {
                ...prev,
                values: [...prev.values, ...res.data.values]
              }
            })
            setLastDatetime(res.data.values.at(-1)?.datetime ?? lastDatetime)
          }
        })
        .catch(console.error)
    }, 30000)

    return () => clearInterval(interval)
  }, [lastDatetime, symbol])

  return { stockData }
}
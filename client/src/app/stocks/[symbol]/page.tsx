'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { StockChart } from "@/components/stocks/StockChart"
import { Button } from "@/components/common/Button"
import { StockInfo } from "@/components/stocks/StockInfo"
import { StockData } from "@/types/stock"
import { StockTradeButton } from "@/components/stocks/StockTradeButton"

import axios from "axios"

export default function StockPage() {
  const params = useParams();
  const symbol = (params?.symbol ?? '') as string;
  const [stockData, setStockData] = useState<StockData  | null>(null);
  const [favorites, setFavorites] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!symbol) return;
    axios.get<StockData>(`http://localhost:8008/stocks/${symbol}`)
      .then(res => setStockData(res.data))
      .catch(console.error);
  }, [symbol])

  useEffect(() => {
    const favoritesCheck = async () => {
    const res = await axios.post('http://localhost:8008/favorites/check', 
      {symbol: symbol}, 
      { withCredentials: true })


      if(res.data.status === true) {
        setFavorites(true);
      }else {
        setFavorites(false);
      }
    }

    favoritesCheck();
  }, [])

  if (!stockData) return <div>주식불러오는중...</div>;

  return (
    <div>
      <div>
      </div>
      <div>
        
        {favorites ?
        <button onClick={async () => {
          const res = await axios.post('http://localhost:8008/favorites/delete', 
            { symbol: symbol }, 
            { withCredentials: true })

            console.log(res.data);
            window.location.reload()
        }}>{symbol} 관심해제</button>
        : 

          <button onClick={async () => {
          const res = await axios.post('http://localhost:8008/favorites', 
            { symbol: symbol }, 
            { withCredentials: true })

            console.log(res.data);
            window.location.reload()
        }}>{symbol} 관심등록</button> 
        }
        <StockInfo
            symbol={stockData.symbol ?? 'UNKNOWN'}
            price={stockData.close}
        />
        <StockChart data={stockData.values} symbol={stockData.symbol} />

      </div>
      <div>
        {stockData.values[0]?.close !== undefined && (
          <StockTradeButton symbol={symbol} price={Number(stockData.values[0].close)} />
        )}
      </div>
    </div>
  )
}
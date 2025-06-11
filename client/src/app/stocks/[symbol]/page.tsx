'use client'

import { useParams } from "next/navigation"
import StockChart from "@/components/stocks/StockChart"
import { StockInfo } from "@/components/stocks/StockInfo"
import { useStockData } from "@/hooks/useStockData"
import { StockTradeButton } from "@/components/stocks/StockTradeButton"
import { FavoriteButton } from "@/components/stocks/FavoriteButton"
import { useIsLoginCheck } from "@/hooks/useIsLoginCheck"
import { useState } from "react"

export default function StockPage() {
  const params = useParams();
  const symbol = (params?.symbol ?? '') as string;
  const [authStatus, setAuthStatus] = useState<'loading' | 'ok' | 'no'>('loading');
  const { stockData } = useStockData(symbol);
  
    // * 페이지에 진입하면,
    useIsLoginCheck({authStatus, setAuthStatus});
  
  
    // * 상탯값이 변경 되기전에는 로딩중 화면이 뜨게 만듦.
    if (authStatus === 'loading') {
      return <div>로딩 중...</div>;
    }
  
    // * 상탯값이 ok일 경우 홈페이지 화면이 뜨게 만듦.
    if (authStatus === 'ok') {
    
  // hook/useStockData.ts 커스텀 훅으로 만듬 useEffect 등등
  
  // 데이터 없을 경우 로딩 문구 표시
  if (!stockData || stockData.values.length === 0) return <div>주식불러오는중...</div>;

  const latest = stockData.values.slice(-1)[0]; // 마지막 데이터 추출 (최근 종가 등)

  return (
    <div className="flex flex-col items-center justify-center  p-4 w-full" >
          <div className="flex items-center w-full gap-2" id='favorite'>
              <FavoriteButton symbol={symbol}/>
          </div>
        <div className="flex flex-col items-start justify-start gap-2 w-full"id='stock-info'>
          <StockInfo
              symbol={stockData.symbol ?? 'UNKNOWN'}
              price={stockData.close}
          />
        </div>
        <div className="w-full" id='stock-chart'>
          <StockChart data={stockData.values} symbol={stockData.symbol}/>

        </div>
        <div className="w-full" id='stock-button'>
          <StockTradeButton
              symbol={stockData.symbol}
              price={Number(latest?.close)}
          />
        </div>
      </div>
  )
}
  return null;
}
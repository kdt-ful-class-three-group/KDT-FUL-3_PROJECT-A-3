import { tradeItems } from "../portfolio/mocks/tradeItem";
import TradeFilter from "./TradeFilter";
import TradeTable from "./TradeTable";
import { useState } from "react";
import { stockList } from "../stocks/StockList";
// 타입
import { TradeItem, TradeType } from "@/types/tradeItem";
type Props={
  trades:TradeItem[]
}

export default function TradeList({trades}:Props){

  // 상태
  // 시작일
  const [startDate, setStartDate]=useState('')
  // 종료일
  const [endDate, setEndDate]=useState('')
  // 종목
  const [stock, setStock]=useState('all')
  // 구매, 판매 타입
  const [type, setType]=useState('all')

  // 주식리스트
  const stocks = stockList.map(i=> i.symbol)


  return(
    <div>
      <TradeFilter />
      <TradeTable trades={tradeItems}/>
    </div>
  )
}

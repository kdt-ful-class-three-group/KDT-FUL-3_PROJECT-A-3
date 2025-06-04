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

export default function TradeList({trades=[]}:Props){ //undefined일 때 에러발생 -> 초기값 설정

  // 상태
  // 시작일
  const [startDate, setStartDate]=useState('')
  // 종료일
  const [endDate, setEndDate]=useState('')
  // 종목
  const [selectedStock, setSelectedStock]=useState('all')
  // 구매, 판매 타입
  const [selectedType, setSelectedType]=useState('all')

  // 주식리스트
  const stockNames = trades.map(i=> i.stock_name)
  const uniqueStock = Array.from(new Set(stockNames)) //중복 제외

  // 필터 적용시키기
  const filtered = trades.filter(item=>{
    const date = item.date.split('T')[0] //날짜
    const type = item.buy_sale===TradeType.Buy ? '구매' : '판매' //구매,판매

    // 시작날짜
    const afterStart = !startDate || date >= startDate
    // 종료날짜
    const beforeEnd = !endDate || date<=endDate
    // 주식종목
    const matchStock = selectedStock ==='all' || selectedStock===item.stock_name
    // 타입
    const matchType = selectedType === 'all' || selectedType === type

    // 반환
    return afterStart && beforeEnd && matchStock && matchType
  })


  return(
    <div>
      <TradeFilter 
        stock = {uniqueStock}
        selectedStock = {selectedStock}
        selectedType = {selectedType}
        setSelectedStock = {setSelectedStock}
        setSelectedType = {setSelectedType}
        startDate = {startDate}
        endDate = {endDate}
        setStartDate = {setStartDate}
        setEndDate = {setEndDate}
      />
      <TradeTable trades={tradeItems}/>
    </div>
  )
}

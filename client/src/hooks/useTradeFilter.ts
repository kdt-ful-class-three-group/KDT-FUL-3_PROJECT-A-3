// 거래 내역 필터에 적용할 훅
import { useMemo, useState } from "react";
import { TradeItem} from "@/types/tradeItem";

export function useTradeFilter(trades:TradeItem[]){
  // 상태
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedStock, setSelectedStock] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  //중복 없이 주식 종목 가져오기
  const uniqueStock = useMemo(()=>{
    return Array.from(new Set(trades.map(i=>i.stock_name)))
  },[trades])

  // 초기화
  const reset = ()=> {
    setStartDate('')
    setEndDate('')
    setSelectedStock('all')
    setSelectedType('all')
  }

  // 필터적용
  const filtered = useMemo(()=>{
    return trades.filter(item=>{
      const date = item.date.split('T')[0] //날짜
      const type = item.buy_sale===true ? '구매' : '판매' //구매,판매

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
  },[trades, startDate, endDate, selectedStock, selectedType])


  // 반환값
  return {
    filtered,
    uniqueStock,
    filters:{
      startDate,
      endDate,
      selectedStock,
      selectedType
    },
    handlers:{
      setStartDate,
      setEndDate,
      setSelectedStock,
      setSelectedType,
      reset
    }
  }
}
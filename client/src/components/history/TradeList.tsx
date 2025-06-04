import TradeFilter from "./TradeFilter";
import TradeTable from "./TradeTable";
import { useState } from "react";
// 타입
import { TradeItem, TradeType } from "@/types/tradeItem";
type Props={
  trades:TradeItem[]
}

//커스텀 훅
import { useTradeFilter } from "@/hooks/useTradeFilter";

export default function TradeList({trades=[]}:Props){ //undefined일 때 에러발생 -> 초기값 설정

  // 커스텀 훅 사용
  const {filtered, uniqueStock, filters, handlers} = useTradeFilter(trades)

  return(
    <div>
      <TradeFilter 
        stock = {uniqueStock}
        selectedStock = {filters.selectedStock}
        selectedType = {filters.selectedType}
        setSelectedStock = {handlers.setSelectedStock}
        setSelectedType = {handlers.setSelectedType}
        startDate = {filters.startDate}
        endDate = {filters.endDate}
        setStartDate = {handlers.setStartDate}
        setEndDate = {handlers.setEndDate}
        resetBtn = {handlers.reset}
      />
      <TradeTable trades={filtered}/>
    </div>
  )
}

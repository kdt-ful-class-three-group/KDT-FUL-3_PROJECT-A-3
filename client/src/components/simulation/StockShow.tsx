// 주식 실시간 순위
// 등락률 - ((현재가 - 전일 종가) / 전일 종가) * 100

import { stockList } from "../stocks/StockList"
import { useEffect, useState } from "react"
import StockCard from './StockCard'
import axios from "axios"

// RTK
import { useSelector, UseSelector } from "react-redux"
import { RootState } from "@/store"
import { useGetStockBySymbolQuery } from "@/store/slices/stockApi"

export default function StockShows  ({btnValue}:{btnValue:string}){

  // 전체 리스트
  const all = stockList.map(i=> i.symbol)
  // RTK 해당 데이터 가져오기
  const holdings = useSelector((state:RootState)=>state.stock.holdings)
  const interest = useSelector((state:RootState)=> state.stock.interest)

  // symbol
  let symbols:string[]=[]

  if(btnValue==='보유'){
    symbols=holdings
  } else if (btnValue==='관심'){
    symbols=interest
  } else {
    symbols = all
  }


  return(
    <div>
      {symbols.map((item, index)=>(
        <div key={index}>{item}</div>
      ))}
    </div>
  )
}
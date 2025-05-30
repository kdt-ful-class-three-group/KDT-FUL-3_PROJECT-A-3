// 주식 실시간 순위
// 등락률 - ((현재가 - 전일 종가) / 전일 종가) * 100

import { stockList } from "../stocks/StockList"
import { useEffect, useState } from "react"

export default function StockShows  ({btnValue}:{btnValue:string}){

  //보유
  const [get, setGet] = useState<string[]>([])
  // 관심
  const [interest, setInterest] = useState<string[]>([])
  //실시간
  const [all, setAll]= useState<string[]>(stockList.map(i=>i.symbol))
  //보여줄 데이터 선정
  const [take, setTake]= useState<string[]>([])


  useEffect(()=>{

    // !임시로 선정
    setGet(['aapl'])
    setInterest(['tsla','googl'])
    
  },[])
  
  useEffect(()=>{
// btnValue에 따른 값 설정
if(btnValue==='보유') setTake(get)
if(btnValue==='관심') setTake(interest)
if(btnValue==='실시간 순위') setTake(all)

  },[btnValue,get,interest])


  return(
    <div>
      {take.map((item, i)=>(
        <div key={i}>{item}</div>
      ))}
    </div>
  )
}
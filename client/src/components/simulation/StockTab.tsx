'use client'
import StockShow from "./StockShow"
import { Button } from "../common/Button"
import { useEffect, useState } from "react"

type btnValue = '보유' | '관심' | '실시간 순위'

export default function StockTab(){

  //버튼 클릭
  const [btnValue, setBtnValue] = useState<btnValue>('보유')

  return(
    <div>
      {/* 버튼 - 구매 종목, 관심 종목, 실시간 순위*/}
      <div>
        <Button name='보유' onClick={()=>setBtnValue('보유')} style={{backgroundColor : btnValue==='보유' ? '#aaa' : undefined}}/>
        <Button name='관심' onClick={()=>setBtnValue('관심')} style={{backgroundColor : btnValue==='관심' ? '#aaa' : undefined}}/>
        <Button name='실시간 순위' onClick={()=>setBtnValue('실시간 순위')} style={{backgroundColor : btnValue==='실시간 순위' ? '#aaa' : undefined}}/>
      </div>
      {/* 버튼에 따라 보여줄 화면 */}
      <p>{btnValue}</p>
      <StockShow /> 
    </div>
  )
}
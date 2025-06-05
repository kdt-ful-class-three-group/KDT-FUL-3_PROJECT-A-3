'use client'
import StockShow from "./StockShow"
import { Button } from "../common/Button"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { setSelectedTab } from "@/store/slices/stockSlice"


export default function StockTab(){

  //버튼 클릭
  const dispatch = useDispatch()
  const selectedTab = useSelector((state:RootState)=>state.stock.selectedTab)

  return(
    <div>
      {/* 버튼 - 구매 종목, 관심 종목, 실시간 순위*/}
      <div>
        <Button name='보유' onClick={()=>dispatch(setSelectedTab('보유'))} style={{backgroundColor : selectedTab==='보유' ? '#aaa' : undefined}}/>
        <Button name='관심' onClick={()=>dispatch(setSelectedTab('관심'))} style={{backgroundColor : selectedTab ==='관심' ? '#aaa' : undefined}}/>
        <Button name='실시간 순위' onClick={()=>dispatch(setSelectedTab('실시간 순위'))} style={{backgroundColor : selectedTab ==='실시간 순위' ? '#aaa' : undefined}}/>
      </div>
      {/* 버튼에 따라 보여줄 화면 */}
      <p>{selectedTab}</p>
      <StockShow btnValue={selectedTab}/> 
    </div>
  )
}
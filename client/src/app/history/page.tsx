'use client'
import TradeList from "@/components/history/TradeList"
import { Button } from "@/components/common/Button"
import { useRouter } from "next/navigation"
// !임시데이터
import { tradeItems } from "@/components/portfolio/mocks/tradeItem"
import { useEffect, useState } from "react"
import axios from "axios"

export default function historyPage(){
  const router= useRouter()

  // 데이터
  const [tradeData, setTradeData] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get('http://localhost:8008/')
      }
      catch(err){
        console.log('거래 내역 가져오기 실패',err)
      }

    }

    // 실행
    fetchData()

  },[tradeData])

  return(
    <div>
      <h1>거래 내역</h1>
      <Button name='뒤로가기' onClick={()=>router.back()}/>
      <TradeList trades={tradeItems} />
    </div>
  )
}
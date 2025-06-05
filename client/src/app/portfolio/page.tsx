'use client'
import { Button } from "@/components/common/Button"
import { useRouter } from "next/navigation"
import DoughnutChart from "@/components/portfolio/Doughnut"
import { tradeItems } from "@/components/portfolio/mocks/tradeItem"
import {Summary} from "@/components/portfolio/Summary"
import HoldingsList from "@/components/portfolio/HoldingsList"
// ! 거래내역 -> 보유 자산 리스트
import { getHoidingWithAvg } from "@/utils/getHoldings"
import { useEffect, useState } from "react"
import axios from "axios"
import { stockList } from "@/components/stocks/StockList"

export default function portfolioPage(){
  //데이터
  const [tradeData, setTradeData]=useState([])
  // ! 총 자산 더미데이터
  const totalValue = 2000000
  const invested = 1000000
  // ! 종목 별 리스트
  // ? 현재가
  const [currentPrices, setCurrentPrices]= useState<Record<string,number>>({})
  const holdingData = getHoidingWithAvg(tradeItems)

  const router = useRouter()

  //stocklist에서 symbol 뽑기
  const symbols:string[]= stockList.map(i=>i.symbol)

  // ?현재가 가져오기
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const tradeRes = await axios.post('http://localhost:8008/userportfolio/history',{},{withCredentials:true})
        setTradeData(tradeRes.data)
        
        // ? 각 symbol에 대해 개별 요청 -> 병렬 처리
        const stockRes = await Promise.all(
          symbols.map(symbol=>
            axios.get(`http://localhost:8008/stocks/${symbol}`).then(res=>({symbol, price:res.data?.close || 0}))
          )
        )

        // ?symbol:price 형태로 변환해서 상태 저장
        const prices : Record<string,number> = {}
        stockRes.forEach(item=>{
          prices[item.symbol]= item.price
        })

        setCurrentPrices(prices)
      }
      catch(err){
        console.log('주식 데이터 가져오기 실패',err)
      }
    }

    fetchData()
  },[])

  return(
    <div>
      {/* 뒤로가기 */}
      <Button name="뒤로가기" onClick={()=> router.back()}/>
      {/* 총 자산 요약 */}
      <Summary totalValue={totalValue} investedAmount={invested}/>
      {/* 도넛 차트 */}
      <div style={{width:'50%'}}>
        <h1>거래량</h1>
        <DoughnutChart trades={tradeItems}/>
      </div>
      {/* 보유 종목 리스트  + 거래내역 이동*/}
      <HoldingsList items={holdingData}/>
    </div>
  )
}
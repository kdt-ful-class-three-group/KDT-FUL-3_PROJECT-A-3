'use client'
import DoughnutChart from "@/components/portfolio/Doughnut"
import { tradeItems } from "@/components/portfolio/mocks/tradeItem"
import {Summary} from "@/components/portfolio/Summary"
import HoldingsList from "@/components/portfolio/HoldingsList"
// ! 거래내역 -> 보유 자산 리스트
import { getHoidingWithAvg } from "@/utils/getHoldings"

export default function portfolioPage(){
  // ! 총 자산 더미데이터
  const totalValue = 2000000
  const invested = 1000000
  // ! 종목 별 리스트
  const holdingData = getHoidingWithAvg(tradeItems)


  return(
    <div>
      {/* 총 자산 요약 */}
      <Summary totalValue={totalValue} investedAmount={invested}/>
      {/* 도넛 차트 */}
      <div style={{width:'50%'}}>
        <DoughnutChart trades={tradeItems}/>
      </div>
      {/* 보유 종목 리스트  + 거래내역 이동*/}
      <HoldingsList items={holdingData}/>
    </div>
  )
}
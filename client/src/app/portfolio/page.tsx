'use client'
import DoughnutChart from "@/components/portfolio/Doughnut"
import { tradeItems } from "@/components/portfolio/mocks/tradeItem"
import Summary from "@/components/portfolio/Summary"
import HoldingsList from "@/components/portfolio/HoldingsList"

export default function portfolioPage(){
  return(
    <div>
      {/* 총 자산 요약 */}
      <Summary />
      {/* 도넛 차트 */}
      <div style={{width:'80%'}}>
        <DoughnutChart trades={tradeItems}/>
      </div>
      {/* 보유 종목 리스트  + 거래내역 이동*/}
      <HoldingsList />
    </div>
  )
}
'use client'
import DoughnutChart from "@/components/portfolio/Doughnut"
import { tradeItems } from "@/components/portfolio/mocks/tradeItem"

export default function portfolioPage(){
  return(
    <div>
      포트폴리오
      <DoughnutChart trades={tradeItems}/>
    </div>
  )
}
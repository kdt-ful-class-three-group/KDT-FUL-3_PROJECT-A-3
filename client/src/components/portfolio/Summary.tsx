// 총 자산
import React from 'react'

// 타입
type SummaryProps = {
  totalValue: number;
  investedAmount:number;
}

export const Summary:React.FC<SummaryProps>=({totalValue, investedAmount})=>{

  // 수익
  const profit = totalValue - investedAmount;
  // 비율
  const profitRate = ((profit/investedAmount)*100).toFixed(2)

  return(
    <div>
      {/* 총 자산 */}
      <div>
        <h3>총 평가 금액</h3>
        <p>{totalValue?.toLocaleString()}풀</p>
      </div>
      {/* 투자 금액 */}
      <div>
        <h3>투자금액</h3>
      <p>{investedAmount?.toLocaleString()}풀</p>
      </div>
      {/* 수익 */}
      <div>
        <h3>수익</h3>
        <p>{profit?.toLocaleString()}원 ({profitRate}%)</p>
      </div>
    </div>
  )
}
// 보유 종목 리스트
import { HoldingItem } from "@/utils/getHoldings"
import { Button } from "../common/Button"
import { useRouter } from "next/navigation"

type Props = {
  items: HoldingItem[]
}

export default function HoldingsList({items}:Props){

  const router = useRouter()

  return(
    <div>
      <h1>보유 종목 리스트</h1>
      <Button name='거래 내역' onClick={()=> router.push('/history')}/>
      {items.map(i=>(
        <div key={i.symbol} style={{display:'flex', gap:'20px'}}>
          <div>{i.symbol}</div>
          <div> 보유 수량 : {i.quantity} 주 </div>
          <div> 평군 매입가 : {i.avgPrice.toLocaleString()} 풀 </div>
          <div> 현재가 : {i.currentPrice.toLocaleString()} 풀 </div>
          <div> 평가 금액 : {(i.quantity * i.currentPrice).toLocaleString()} 풀 </div>
        </div>

      ))}
    </div>
  )
}
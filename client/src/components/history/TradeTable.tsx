// 거래내역 리스트
//타입
import { TradeItem, TradeType } from "@/types/tradeItem"

export default function TradeTable({trades}:{trades:TradeItem[]}){
  return(
    <div>
      <ul>
        <li>날짜</li>
        <li>종목</li>
        <li>구매/판매</li>
        <li>가격</li>
        <li>주</li>
        <li>총 금액</li>
      </ul>
      {trades.map(item=>(
        <ul key={item.id}>
          <li>{item.date.split('T')[0]}</li>
          <li>{item.buy_sale === TradeType.Buy ? '구매':'판매'}</li>
          <li>{item.stock_name}</li>
          <li>{item.price.toLocaleString()}풀</li>
          <li>{item.much}</li>
          <li>{(item.price*item.much).toLocaleString()}풀</li>
        </ul>
      ))}
    </div>
  )
}
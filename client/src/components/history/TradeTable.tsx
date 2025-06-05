// 거래내역 리스트
//타입
import { TradeItem } from "@/types/tradeItem"

export default function TradeTable({trades}:{trades:TradeItem[]}){
  return(
    <div style={{borderCollapse:'collapse'}}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(6,1fr)',alignItems:'center', fontWeight:'bold'}}>
        <div>날짜</div>
        <div>종목</div>
        <div>구매/판매</div>
        <div>가격</div>
        <div>주</div>
        <div>총 금액</div>
      </div>
      {trades.map(item=>(
        <div key={item.id} style={{display:'grid', gridTemplateColumns:'repeat(6,1fr)', alignItems:'center'}}>
          <div>{item.date.split('T')[0]}</div>
          <div>{item.buy_sale === true ? '구매':'판매'}</div>
          <div>{item.stock_name}</div>
          <div>{item.price.toLocaleString()}풀</div>
          <div>{item.much}</div>
          <div>{(item.price*item.much).toLocaleString()}풀</div>
        </div>
      ))}
    </div>
  )
}
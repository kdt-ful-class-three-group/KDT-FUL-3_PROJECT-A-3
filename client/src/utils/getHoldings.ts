// 거래 기록을 기반으로 종목별 보유 현황 구하기

// 타입
import { TradeItem } from "@/types/tradeItem";
export type HoldingItem={
  symbol:string;
  quantity:number; //매수 총량 - 매도 총량
  avgPrice : number ; //평균 매수 단가
  currentPrice: number //현재 주가 - 정의한 가격 사용
}

export function getHoidingWithAvg(items:TradeItem[],currentPrices:Record<string, number>):HoldingItem[]{

  // 종목별 집계용 Map : 보유 수량, 총 매수 수량, 총 매수 금액
  const map = new Map<
  string,
  {quantity: number; totalBuy: number; buyAmount: number}
  >()

  console.log('item',items, 'current',currentPrices)

  for(const item of items){
    const record = map.get(item.symbol) || {
      quantity: 0,
      totalBuy: 0,
      buyAmount: 0
    }

    // 매수
    if(item.buy_sell===true){
      record.quantity += item.much;
      record.totalBuy += item.much;
      record.buyAmount += item.much * item.price
    }
    // 매도
    else {
      record.quantity -= item.much
    }

    map.set(item.symbol, record)
  }

  const result: HoldingItem[]=[]

  for(const [symbol, data] of map.entries()){
    // 보유수량 >0 인 종목만 결과에 포함
    if(data.quantity>0){
      result.push({
        symbol,
        quantity: data.quantity,
        avgPrice: Math.round(data.buyAmount / data.totalBuy), // 총 매입금액 / 총 매수 수량
        currentPrice: currentPrices[symbol] || 0 // 현재가 객체에서 조회 
      })
    }
  }
  return result
}
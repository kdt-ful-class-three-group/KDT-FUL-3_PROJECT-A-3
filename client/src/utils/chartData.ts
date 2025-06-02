// 공통 함수, 유틸리티 코드
// ! mocks의 더미 데이터 사용
import { TradeItem } from "@/types/tradeItem"

// 주식 종목별로 거래량을 집계
// 도넛 차트에 넣을 형식으로 반환
export const DonutChartData = (items:TradeItem[])=>{
  const map = new Map<string,number>()

  // key : 종목 명 , value : 거래량 => {종목명: 거래량}
  // map에서 누적 거래량을 갖옴 - 합산된 값이 저장
  for(const item of items){
    const current = map.get(item.stock_name)||0
    map.set(item.stock_name, current + item.much) 
  }

  //도넛 차트용 데이터로 분리
  const labels = Array.from(map.keys())
  const data = Array.from(map.values())

  return { labels, data }
}
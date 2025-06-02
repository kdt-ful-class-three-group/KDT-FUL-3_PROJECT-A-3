// !임시데이터
//타입
enum TradType {
  Buy = 0,
  Sell = 1
}
type tradeItem = {
  id:number; //계좌순서
  account_number: number; //계좌
  user_name:string; //유저
  stock_name:string//종목명
  price:number; //거래 당식 종목 가격
  much: number; //거래량
  buy_sale : TradType; //구매 또는 판매
  date: string; //거래일자
}

//! 더미데이터
import { tradeItems } from "./mocks/tradeItem";


export default function Doughnut(){
  return(
    <div>도넛차트</div>
  )
}
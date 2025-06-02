import { tradeItems } from "../portfolio/mocks/tradeItem";
import TradeTable from "./TradeTable";

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

export default function TradeList(){
  return(
    <div>
      <h1>리스트</h1>
      <TradeTable trades={tradeItems}/>
    </div>
  )
}

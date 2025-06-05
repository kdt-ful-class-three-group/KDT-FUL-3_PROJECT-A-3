
export type TradeItem = {
  id:number; //계좌순서
  account_number: number; //계좌
  user_name:string; //유저
  stock_name:string//종목명
  price:number; //거래 당식 종목 가격
  much: number; //거래량
  buy_sale : boolean; //구매 true 또는 판매 false
  date: string; //거래일자
}
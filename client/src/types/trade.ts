export interface TradeContentProps {
  mode: 'buy' | 'sell'
}

export interface TradeKeypadProps {
  symbol:string;
  amount: string;
  setAmount: (value: string) => void;
}
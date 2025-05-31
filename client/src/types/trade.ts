export interface TradeContentProps {
  mode: 'buy' | 'sell'
}

export interface TradeKeypadProps {
  amount: string;
  setAmount: (value: string) => void;
}
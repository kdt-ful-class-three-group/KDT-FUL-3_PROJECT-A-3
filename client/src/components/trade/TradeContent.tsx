import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useState } from 'react';
import { TradeContentProps } from "@/types/trade";
import { TradeKeypad } from "./TradeKeypad";
import styles from './TradeStyles.module.css'

export function TradeContent({ mode }: TradeContentProps) {
  const { symbol, price } = useSelector((state: RootState) => state.trade)
  const [amount, setAmount] = useState('')

  let title;
  if (mode === 'sell') {
    title = '판매할 가격';
  } else if (mode === 'buy') {
    title = '구매할 가격';
  }

  return (
    <div>
      <div className={styles.amountBox}>
        <h1 className={styles.symbol}>{symbol}</h1>
        <div className={styles.subHeader}>
          <span>시장가: {price}풀</span>
        </div>
      </div>
      <div>
        <TradeKeypad
          amount={amount}
          setAmount={setAmount}
          mode={mode}
          price={price}
        />
      </div>

    </div>
  )
}
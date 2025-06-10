import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import React, { useState } from 'react';
import { TradeContentProps } from "@/types/trade";
import { TradeKeypad } from "./TradeKeypad";
import styles from './TradeStyles.module.css'
import {iconMap} from '../stocks/StockIconMaps';

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
        <div className="bg-[#f1f3f5] justify-center items-center rounded-xl p-4 mx-auto mb-5 max-w-[320px]" id='stock'>
          <h1 className="text-[30px] font-bold text-center mb-1">
    <span className="flex items-center justify-center gap-2">
      {(iconMap[symbol] || (() => <span>{symbol}</span>))()} {symbol}
    </span>
          </h1>
          <div className="flex font-bold w-full max-w-[300px] text-sm mx-auto justify-center">
            <span>시장가: {price}풀</span>
          </div>
        </div>
        <div>
          <TradeKeypad
              symbol={symbol}
              amount={amount}
              setAmount={setAmount}
              mode={mode}
              price={price}
          />
        </div>

      </div>
  )
}
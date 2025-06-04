import { Input } from "../common/Input"
import { Button } from "../common/Button"
import { keypadNumbers } from "./KeypadNumbers"
import { TradeContentProps } from "@/types/trade"
import { TradeKeypadProps } from "@/types/trade"
import styles from './TradeStyles.module.css'
import axios from "axios"

export function TradeKeypad({ symbol, mode, amount, setAmount, price }: TradeContentProps & TradeKeypadProps & { price: number }) {
  const total = Number(amount) * price;
  
  
  // 키패드 이벤트 지우기,0무시 등
  // ! 자기 자산이랑 연동해서 자산보다 많이 입력못하게 만들어야할거같음.
  const handleKeypadClick = (value: string) => {
    if (value === '←') {
      setAmount(amount.slice(0, -1));
    } else {
      // 처음에 '0' 또는 '00'은 무시
      if (amount === '' && (value === '0' || value === '00')) {
        return;
      }
      setAmount(amount + value);
    }
  };
  
  // 모드별 구매처리 기능
  // total 금액이 0일경우 비활성화나 안눌리게해야함.
  const handleAction = () => {
    if (mode === 'sell') {
      // 판매 처리
      console.log(total);
  Promise.all([
    axios.patch(
        'http://localhost:8008/account/trade',
        { price: total, type: mode },
        { withCredentials: true }
      ),
    axios.patch(
        'http://localhost:8008/userportfolio/trade',
        { type: mode, symbol: symbol, price: total, much: amount },
        { withCredentials: true }
      )
      .then(() => {
        window.location.href = '/home';
      })
      .catch((err) => {
        console.error('거래 실패:', err);
      })
    ])
    } else {
      // 구매 처리
      console.log(total);
  Promise.all([
    axios.patch(
        'http://localhost:8008/account/trade',
        { price: total, type: mode },
        { withCredentials: true }
      ),
    axios.patch(
        'http://localhost:8008/userportfolio/trade',
        { type: mode, symbol:symbol, price:total, much: amount },
        { withCredentials: true }
      )
      .then(() => {
        window.location.href = '/home';
      })
      .catch((err) => {
        console.error('거래 실패:', err);
      }),
    ])
    }
  };

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    if (/^\d*$/.test(value)) {
      if (amount === '' && (value === '0' || value === '00')) return;
      setAmount(value);
    }
  };

  let title;
  if (mode === 'sell') {
    title = '판매할 가격';
  } else if (mode === 'buy') {
    title = '구매할 가격';
  }

  return (
    <div>
      <div className={styles.amountBox}>
        <div className={styles.totalPrice}>
          <p>{title}</p>
          <p className={styles.totalPriceValue}>
            {amount ? `${total}풀` : '\u00A0'}
          </p>
        </div>
        <Input
          className={styles.amountInput}
          label=""
          placeholder="몇 주 구매할까요?"
          value={amount}
          onChange={handleAmount}
        />
      </div>

      <div className={styles.keypadGrid}>
        {keypadNumbers.map((num) => (
          <Button
            className={styles.keypadButton}
            key={num}
            name={num} onClick={() => handleKeypadClick(num)} />
        ))}
      </div>

      <div className={styles.tradeButton}>
        <Button
          className={mode === 'sell' ? styles.sellButton : styles.buyButton}
          name={mode === 'sell' ? "판매하기" : "구매하기"}
          onClick={handleAction}
        />
      </div>
    </div>
  )
}
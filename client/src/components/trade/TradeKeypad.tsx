import { Input } from "../common/Input"
import { Button } from "../common/Button"
import { TradeContentProps } from "@/types/trade"
import { TradeKeypadProps } from "@/types/trade"
import styles from './TradeStyles.module.css'

export function TradeKeypad({ mode, amount, setAmount, price }: TradeContentProps & TradeKeypadProps & { price: number }) {
  // 키패드 버튼들
  const keypadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', '←'];

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
      console.log(Number(amount) * price );
    } else {
      // 구매 처리
      console.log(Number(amount) * price );
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
            {amount ? `${Number(amount) * price}풀` : '\u00A0'}
          </p>
        </div>
        <Input
          className={styles.amountInput}
          label=""
          placeholder="몇 주 구매할까요?"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              if (amount === '' && (value === '0' || value === '00')) return;
              setAmount(value);
            }
          }}
        />
      </div>

      <div className={styles.keypadGrid}>
        {keypadNumbers.map((num) => (
          <Button
            className={styles.keypadButton}
            key={num}
            name={num} onClick={() =>
              handleKeypadClick(num)} />
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
import { Input } from "../common/Input"
import { Button } from "../common/Button"
import { TradeContentProps } from "@/types/trade"
import { TradeKeypadProps } from "@/types/trade"
import styles from './TradeStyles.module.css'

export function TradeKeypad({ mode, amount, setAmount, price }: TradeContentProps & TradeKeypadProps & { price: number }) {
  // 키패드 버튼들
  const keypadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', '←'];

  const handleKeypadClick = (value: string) => {
    if (value === '←') {
      setAmount(amount.slice(0,-1)); // 마지막 글자 제거
    } else {
      setAmount(amount + value); // 숫자 추가
    }
  };
  

  const handleAction = () => {
    if (mode === 'sell') {
      // 판매 처리
    } else {
      // 구매 처리
    }
  };

  return (
    <div>
      <div>
        <Input
          label="수량"
          placeholder="몇 주 구매할까요?"
          value={amount}
          readOnly
        />
       {amount && <p>총액: {Number(amount) * price}풀</p>}
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

      <div>
        <Button
          name={mode === 'sell' ? "판매하기" : "구매하기"}
          onClick={handleAction}
        />
      </div>
    </div>
  )
}
import { Button } from "../common/Button";
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { TradeContentProps } from "@/types/\btrade";



export function TradeContent({ mode }: TradeContentProps) {
  const { symbol, price } = useSelector((state: RootState) => state.trade)

  let title;
  if (mode === 'sell') {
    title = '판매할 가격';
  } else if (mode === 'buy') {
    title = '구매할 가격';
  }

  return (
    <div>
      <div>
        <h2>{symbol}</h2>
        <p>{title}</p>
        <p>시장가: {price}풀</p>
      </div>
      <div>
        {/* TradeKeypad 들어올거임 키패드 */}
      </div>

    </div>
  )
}
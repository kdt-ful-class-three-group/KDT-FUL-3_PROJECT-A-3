import { Button } from "../common/Button";
import { useSelector } from 'react-redux'
import { RootState } from '@/store' // 실제 store 경로에 맞게 조정하세요

interface TradeContentProps {
  mode: 'buy' | 'sell'
}

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
        {/* 공통 폼 숫자 입력 버튼이나 input 버튼 컴포넌트 */}
        
      </div>

      {mode === 'sell' &&
        <Button
          name="판매하기"
          onClick={() => { }}
        />}

      {mode === 'buy' &&
        <Button
          name="구매하기"
          onClick={() => { }}
        />}
    </div>
  )
}
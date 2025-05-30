import { Button } from "../common/Button";

interface TradeContentProps {
  mode: 'buy' | 'sell'
}

export function TradeContent({ mode }: TradeContentProps) {

  let title;
  if (mode === 'sell') {
    title = '구매';
  } else if (mode === 'buy') {
    title = '판매';
  }
   
  //! 판매, 구매 POST 요청 


  // sell | buy 따라 조건분기
  return (
    <div>
      {mode === 'sell' && <h1>{title}</h1>}
      {mode === 'buy' && <h1>{title}</h1>}

      <div>

        {/* 공통 폼 숫자 입력 버튼이나 input 버튼 컴포넌트  */}

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
// 주식 거래
import { Button } from "@/components/common/Button";

export default function Trade(){

  //! props나 DB에서 가져올 데이터 - 내금액, 주식 데이터(1주 희망 가격, 수수료, 총 가격)
  const amount:number = 10000;
  const stockShare:number = 1;
  const charge:number = 8;
  const all:number = stockShare + charge;

  // ! 버튼 로직

  return(
    <div>
      <div>
        <p>잔액</p>
        <p>{amount}원</p>
      </div>
      <div>
        <p>1주 희망 가격</p>
        <p>{stockShare}원</p>
      </div>
      <div>
        <p>예상 수수료</p>
        <p>{charge}</p>
      </div>
      <div>
        <p>총 가격</p>
        <p>{all}원</p>
      </div>
      {/* 버튼 */}
      <div>
        <Button name='취소' type="button"/>
        <Button name='확인' type="button"/>
      </div>
    </div>
  )
}
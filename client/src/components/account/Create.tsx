// 계좌 생성

import { Button } from "../common/Button";

export default function Create(){

  // 랜덤 계좌
  function strAccount(){

    const account = Math.floor(10000000 + Math.random() * 90000000); 

    const str = account.toString()
    return `1111-${str.slice(0,3)}-${str.slice(3)}`
  }
  
  //!확인 버튼 클릭 로직


  return (
    <div>
      <p>확인 버튼을 누르면 완료됩니다</p>
      <div>
        <p>계좌 번호</p>
        <p>{strAccount()}</p>
      </div>
      <div>
        <p>초기 금액</p>
        <p>1,000,000풀</p>
      </div>
      {/* 버튼 */}
      <Button name='확인' type='button'/>
    </div>
  )
}
// 계좌 생성

import { Button } from "../common/Button";

type props = {
  //확인 버튼 클릭 
  onConfirm?:()=>void
}

export default function Create({onConfirm}:props){

  // 랜덤 계좌
  function strAccount(){

    const account = Math.floor(10000000 + Math.random() * 90000000); 

    const str = account.toString()
    return `1111-${str.slice(0,3)}-${str.slice(3)}`
  }
  

  //! 확인버튼 누르면 DB에 전달 필요함

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
      <Button name='확인' type='button' onClick={onConfirm}/>
    </div>
  )
}
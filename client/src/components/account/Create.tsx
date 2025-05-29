// 계좌 생성

import { Button } from "../common/Button";
import axios from "axios";


type props = {
  //확인 버튼 클릭 
  onConfirm?:()=>void
}

export default function Create({onConfirm}:props){

  // 랜덤 계좌
    function creatAccount(){
        const res = axios.post('http://localhost:8008/account/create', {},{
            withCredentials: true,
        })
    }
  //! 확인버튼 누르면 DB에 전달 필요함

  return (
    <div>
      <p>확인 버튼을 누르면 완료됩니다</p>
      <div>
        <p>계좌 번호</p>
        <p>{}</p>
      </div>
      <div>
        <p>초기 금액</p>
        <p>1,000,000풀</p>
      </div>
      {/* 버튼 */}
      <Button name='확인' type='button' onClick={creatAccount}/>
    </div>
  )
}
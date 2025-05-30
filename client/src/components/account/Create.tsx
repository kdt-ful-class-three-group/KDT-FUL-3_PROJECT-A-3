// 계좌 생성

import { Button } from "../common/Button";
import axios from "axios";
import {useState} from "react";


type props = {
  //확인 버튼 클릭 
  onClose?:()=>void
}

/**
 * 계좌 생성 컴포넌트
 * @param onClose - 계좌 생성 완료 후 호출되는 콜백 함수 (선택)
 */
export default function Create({onClose}: props) {



  /**
   * 계좌를 생성하는 함수
   * 서버에 POST 요청을 보내고, 응답으로 받은 계좌 번호를 상태에 저장
   * 계좌 생성 후 onClose 콜백을 호출하여 모달을 닫음
   */
   function creatAccount() {
    axios.post('http://localhost:8008/account/create', {}, {
      withCredentials: true,
    }).then(res => {
      console.log(res.data);
      // setAccountNumber(res.data.accountNumber); // 서버에서 받은 계좌 번호 설정
         const newA = res.data.account_number;
      if (onClose) onClose(); // 모달 닫기
    alert(`계좌가 생성되었습니다. 계좌 번호: ${newA}`);
    });

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
      <Button name='취소' type='button' onClick={onClose}/>

    </div>
  )
}
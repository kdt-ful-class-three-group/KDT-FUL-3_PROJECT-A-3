'use client'
import { useState } from "react";
import { Section } from "../common/Section";
//계좌 생성 버튼
import CreateStock from "./CreateStock";
import { Modal } from "../account/Modal";

export function StockSection() {

  //신규 회원인지, 계좌 유무에 따른 상태값 설정
  const [hasAccount, setHasAccount] = useState(false)

  //모달창
  const [showModal, setShowModal] = useState(false)

  //모달에서 확인 버튼 클릭시
  const handleConfirm=()=>{
    setHasAccount(true)
    setShowModal(false)
  }

  //!차트, 계좌번호, 계좌 임시 
  const account : number = 1;

  return (
    <>
      <Section
        title="주식"
        // description="주식 시장의 최신 동향과 정보를 확인하세요."
        children={hasAccount ? <p>내 계좌 {account}</p> : <CreateStock onClick={()=>setShowModal(true)}/>}
      />
      {showModal && <Modal type='create' onConfirm={handleConfirm}/>}
    </>
  );
}
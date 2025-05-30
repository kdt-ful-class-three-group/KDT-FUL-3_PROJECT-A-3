'use client'
import { useEffect, useState } from "react";
import { Section } from "../common/Section";
//계좌 생성 버튼
import CreateStock from "./CreateStock";
import { Modal } from "../account/Modal";
import MyStock from "./MyStock";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import axios from "axios";
import { setField } from "@/store/slices/accountSlice";

export function StockSection() {

  //신규 회원인지, 계좌 유무에 따른 상태값 설정
  const [hasAccount, setHasAccount] = useState(false)

  //모달창
  const [showModal, setShowModal] = useState(false)

  const dispatch = useDispatch();
  const {account_number, asset} = useSelector((state:RootState) => state.account)

      function dataChange(field: 'account_number'|'asset', value:string) {
        dispatch(setField({field, value}))
      }



  //모달에서 확인 버튼 클릭시
  const handleConfirm=()=>{
    setHasAccount(true)
    setShowModal(false)
  }

   useEffect(() => {
    axios.post('http://localhost:8008/account/check', {}, {
      // * 쿠키를 포함해서 보낸다는 설정.
      withCredentials: true, // 쿠키 전송
    })
    // * 응답이 제대로 오면, 리프레쉬 성공 메시지를 표출하고, 상탯값을 ok로 변경
    .then(res => {
      console.log('계좌 있음.', res.data);
      setHasAccount(true);
      dataChange('account_number', res.data.account_number);
      dataChange('asset', res.data.asset);
    })
    // * 응답 오류가 발생하면, 리프레쉬 실패 메시지를 표출하고, 상탯값을 no로 변경
    .catch(err => {
      console.log('계좌 없음.', err.data);
    });
  }, [])

  //!차트, 계좌번호, 계좌 임시 
  // const account : string = `1111-123-456789`;
  // const money : string = `1,000,000`;

  return (
    <>
      <Section
        title="주식"
        // description="주식 시장의 최신 동향과 정보를 확인하세요."
        children={hasAccount ? <MyStock /> : <CreateStock onClick={()=>setShowModal(true)}/>}
      />
      {showModal && <Modal type='create'/>}
    </>
  );
}
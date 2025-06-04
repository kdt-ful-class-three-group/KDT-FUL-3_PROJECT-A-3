'use client'
import { useEffect, useState } from "react";
import { Section } from "../../common/Section";
//계좌 생성 버튼
import CreateAccount from './CreateAccount';
import { Modal } from "./Modal";
import MyStock from "./MyAccount";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import axios from "axios";
import { setField } from "@/store/slices/accountSlice";

export function AccountSection() {

  //신규 회원인지, 계좌 유무에 따른 상태값 설정
  const [hasAccount, setHasAccount] = useState(false)

  //모달창
  const [showModal, setShowModal] = useState(false)

  // * account에서 활용할 account_number와 asset을 리덕스 툴킷으로 등록.
  const dispatch = useDispatch();
  const {account_number, asset} = useSelector((state:RootState) => state.account)

      function dataChange(field: 'account_number'|'asset', value:string) {
        dispatch(setField({field, value}))
      }

   useEffect(() => {
    axios.post('http://localhost:8008/account/check', {}, {
      // * 쿠키를 포함해서 보낸다는 설정.
      withCredentials: true, // 쿠키 전송
    })
    // * 응답이 제대로 오면, 계좌 있음 메시지를 표출하고, setHasAccount(true)로 변경
    .then(res => {
      console.log('계좌 있음.', res.data);
      setHasAccount(true);

      // * 변수 값을 불러온 데이터로 변경.
      dataChange('account_number', res.data.account_number);
      dataChange('asset', res.data.asset);
      // * 해당 값들을 잘 읽어오는지, 디버깅 용 코드.
      console.log(account_number);
      console.log(asset);
    })
    // * 응답 오류가 발생하면, 계좌 없음 메시지 표출
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
        children={hasAccount ? <MyStock /> : <CreateAccount onClick={()=>setShowModal(true)}/>}
      />
      {showModal && <Modal type='create'/>}
      {/* <button onClick={
      () => {
  Promise.all([
    axios.patch(
        'http://localhost:8008/account/trade',
        { price: 210000, type: 'buy' },
        { withCredentials: true }
      ),
    axios.patch(
        'http://localhost:8008/userportfolio/trade',
        { type: 'buy', symbol:'AAPL', price:210000, much: 1 },
        { withCredentials: true }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.error('거래 실패:', err);
      }),
    ])
  }}>구매</button>
        <button onClick={
      () => {
  Promise.all([
    axios.patch(
        'http://localhost:8008/account/trade',
        { price: 210000, type: 'sell' },
        { withCredentials: true }
      ),
    axios.patch(
        'http://localhost:8008/userportfolio/trade',
        { type: 'sell', symbol:'AAPL', price:210000, much: 1 },
        { withCredentials: true }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.error('거래 실패:', err);
      })
    ])
  }}>판매</button> */}
    </>
  );
}
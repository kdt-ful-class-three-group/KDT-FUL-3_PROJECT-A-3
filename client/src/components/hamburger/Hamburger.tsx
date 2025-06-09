import { Button } from "../common/Button"
import { LogoutButton } from "../auth/logout/LogoutButton";
import { useState, useEffect } from "react";
import Link from "next/link";

type props = {
  onClose : ()=>void
}

export function Hamburger({onClose}:props){

  const [show, setShow] = useState(false);
  useEffect(() => {
      setShow(true);
      // search 화면 나왔을 때 배경 스크롤 방지
      document.body.style.overflow = 'hidden';
      // search 화면 사라질 때 원래대로 복구
      return () => { document.body.style.overflow = 'auto'; };
    }, []);

  // ! 마이페이지 이동 & 로그아웃 기능 추가

  return (
    <>
      <div
        className={`fixed inset-0 z-40 ${show ? '' : 'pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-[20%] h-full w-1/2 bg-[#b8c2a5] z-50 transform ${show ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <Button variant="icon" icon="close" onClick={onClose}/>
        <div>
          <ul>
            <li><Link href={'/mypage'}>내 정보</Link></li>
            <li><Link href={'/portfolio'}>포트폴리오</Link></li>
            <li><Link href={'/history'}>거래 내역</Link></li>
            <li>알림</li>
            <li>이벤트</li>
            <li>설정</li>
            <li>고객센터</li>
          </ul>
        </div>
        <LogoutButton />        
      </div>
    </>
  )
}
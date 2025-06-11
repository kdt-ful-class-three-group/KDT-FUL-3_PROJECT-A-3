import { Button } from "../common/Button"
import { LogoutButton } from "../auth/logout/LogoutButton";
import { useState, useEffect } from "react";
import Link from "next/link";

type props = {
  onClose : ()=>void
}

export function Hamburger({ onClose }: props) {

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
        className={`fixed inset-0 bg-white/10 backdrop-blur-sm z-40 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 h-full right-0 w-[188px]l bg-white rounded-l-lg shadow-xl z-50 transform ${show ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex justify-end">
          <Button variant="icon" icon="close" onClick={onClose} className="w-10 h-10" />
        </div>
        <div className="h-full flex flex-col justify-between px-4 py-6">
          <ul className="space-y-3">
            <li><Link href="/mypage" onClick={onClose} className="block px-3 py-2 rounded-md hover:bg-gray-100 text-sm font-medium">내 정보</Link></li>
            <li><Link href="/portfolio" onClick={onClose} className="block px-3 py-2 rounded-md hover:bg-gray-100 text-sm font-medium">포트폴리오</Link></li>
            <li><Link href="/history" onClick={onClose} className="block px-3 py-2 rounded-md hover:bg-gray-100 text-sm font-medium">거래 내역</Link></li>
            <li className="px-3 py-2 rounded-md hover:bg-gray-100 text-sm font-medium cursor-pointer">알림</li>
            <li className="px-3 py-2 rounded-md hover:bg-gray-100 text-sm font-medium cursor-pointer">이벤트</li>
            <li className="px-3 py-2 rounded-md hover:bg-gray-100 text-sm font-medium cursor-pointer">설정</li>
            <li className="px-3 py-2 rounded-md hover:bg-gray-100 text-sm font-medium cursor-pointer">고객센터</li>
          </ul>
          <div className="flex justify-center mb-7">
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  )
}
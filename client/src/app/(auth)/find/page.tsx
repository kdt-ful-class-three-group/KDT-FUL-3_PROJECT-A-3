"use client";

import { useState } from "react";
import Link from "next/link";
import { IdFindForm } from "@/components/auth/find/IdFindForm";
import { PwFindForm } from "@/components/auth/find/PwFindForm";
import { Button } from "@/components/common/Button";
import { useNotLoginCheck } from "@/hooks/useNotLoginCheck";

export default function Find() {
  const [activeTab, setActiveTab] = useState<"id" | "pw">("id")
  const [isId, setIsId]=useState(true)

    const [authStatus, setAuthStatus] = useState<'loading' | 'ok' | 'no'>('loading');
  
    // * 페이지에 진입하면,
    useNotLoginCheck({authStatus, setAuthStatus});

  
  
    // * 상탯값이 변경 되기전에는 로딩중 화면이 뜨게 만듦.
    if (authStatus === 'loading') {
      return <div>로딩 중...</div>;
    }
  
    // * 상탯값이 ok일 경우 홈페이지 화면이 뜨게 만듦.
    if (authStatus === 'ok') {

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-10">
      <div className="flex justify-center w-full p-4">
        <Button onClick={() => {setActiveTab("id"); setIsId(true)}} name="아이디 찾기" className={` w-1/3 py-2 px-1 border-b-4 border-solid ${isId ? 'border-[#B0DB9C] font-bold' : 'border-transparent'}`}/>
        <Button onClick={() => {setActiveTab("pw");setIsId(false)}} name="비밀번호 찾기" className={`w-1/3 py-2 px-1 border-b-4 border-solid ${isId ? 'border-transparent' : 'border-[#B0DB9C] font-bold'} `}/>
      </div>

      <div className="w-full p-4">
        {activeTab === "id" && <IdFindForm />}
        {activeTab === "pw" && <PwFindForm />}
      </div>

      <div>
      <Link href='/login' className="border-2 border-[#B0DB9C]/50 rounded p-3 cursor-pointer hover:bg-[#B0DB9C]">로그인 하기</Link>
      </div>

    </div>
  )
}
 return null;
}
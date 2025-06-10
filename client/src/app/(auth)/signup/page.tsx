'use client'
import { SignupForm } from "@/components/auth/signup/SignupForm";
import { useNotLoginCheck } from "@/hooks/useNotLoginCheck";
import axios from "axios";
import { useState } from "react";
// import { SignupForm } from "@/components/signup/SignupForm"

export default function SignupPage() {

    const [authStatus, setAuthStatus] = useState<'loading' | 'ok' | 'no'>('loading');
  
    useNotLoginCheck({authStatus, setAuthStatus});
  
    // ✅ 아직 판단 중
    if (authStatus === 'loading') {
      return <div>로딩 중...</div>;
    }
  
    // ✅ 인증 성공
    if (authStatus === 'ok') {

  const handleSignup = async (userData: {
    id: string;
    password: string;
    name: string;
    email: string;
    birth: string;
  }) => {
    try {
      const res = await axios.post(
        "http://localhost:8008/auth/register",
        {
          ...userData,
          user_id: userData.id,
          id: undefined
        },
        { withCredentials: true }
      );
      console.log(res);
      alert("회원가입이 완료되었습니다!");
    } catch (error: any) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      console.error("서버 응답 오류:", error.response?.status);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-4 flex flex-col">
        <h1 className="text-4xl font-bold mb-15 ">회원가입</h1>
        <SignupForm onSignup={handleSignup} />
      </div>
    </div>
  )
}
  return null;
}
'use client'

// 컴포넌트 가져오기
import { LoginForm } from "@/components/auth/login/LoginForm";
import { AuthButton } from "@/components/auth/login/AuthButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNotLoginCheck } from "@/hooks/useNotLoginCheck";

export default function LoginPage(){
// * 상탯값에 따른 화면 표출을 위해 로그인과 같은 화면 표출 로직을 사용.
  const [authStatus, setAuthStatus] = useState<'loading' | 'ok' | 'no'>('loading');

  useNotLoginCheck({authStatus, setAuthStatus});

  // ✅ 아직 판단 중
  if (authStatus === 'loading') {
    return <div>로딩 중...</div>;
  }

  // ✅ 인증 성공
  if (authStatus === 'ok') {
    return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-4">
      {/* 페이지 이름 */}
      <h1 className="text-4xl font-bold mb-15">로그인</h1>
      {/* 로그인폼 */}
      <LoginForm/>    
      {/* 간편로그인 */}
      <div className="mt-8">
        <AuthButton />
      </div>
      </div>
    </div>
    );
  }

  return null;
}
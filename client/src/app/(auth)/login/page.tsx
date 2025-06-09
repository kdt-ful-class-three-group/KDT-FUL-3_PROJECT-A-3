'use client'

// 컴포넌트 가져오기
import { LoginForm } from "@/components/auth/login/LoginForm";
import { AuthButton } from "@/components/auth/login/AuthButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LoginPage(){
// * 상탯값에 따른 화면 표출을 위해 로그인과 같은 화면 표출 로직을 사용.
  const [authStatus, setAuthStatus] = useState<'loading' | 'ok' | 'no'>('loading');

  useEffect(() => {
    axios.post('http://localhost:8008/auth/refresh', {}, {
      withCredentials: true,
    })
    .then(res => {
      console.log('refresh 성공', res.data);
      // * 로그인이 유효합니다 화면이 아닌 그냥 홈으로 이동하게 하고 싶으면 아래의 코드를 살리고 상탯값을 변경하는 코드를 주석처리 하면 됨.
      // window.location.href = '/home'
      // * 홈페이지와는 다르게, 토큰이 없어야 로그인 화면으로 넘어가야하므로, 토큰이 있다는 응답을 받으면, 상탯값을 no로 만들어 준다.
      setAuthStatus('no');
    })
    .catch(err => {
      console.log('refresh 실패', err.data);
      // * 홈페이지와는 다르게, 토큰이 있어야 로그인 화면으로 넘어가야하므로, 토큰이 없다는 응답을 받으면, 상탯값을 ok로 만들어 준다.
      setAuthStatus('ok');
    });
  }, []);

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

  // * window.location.href = "/home"을 살릴 경우 아래의 코드는 필요가 없어지므로 주석처리 권장.
    if (authStatus === 'no') {
    return (
      <div>
        <h1>로그인이 유효합니다.</h1>
      <Link href='/home'>홈페이지로 이동</Link>
      </div>
    );
  }

  return null;
}
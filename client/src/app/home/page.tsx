'use client';

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [authStatus, setAuthStatus] = useState<'loading' | 'ok' | 'no'>('loading');

  useEffect(() => {
    axios.post('http://localhost:8008/auth/refresh', {}, {
      withCredentials: true, // 쿠키 전송
    })
    .then(res => {
      console.log('refresh 성공', res.data);
      setAuthStatus('ok');
    })
    .catch(err => {
      console.log('refresh 실패', err.data);
      setTimeout(() => {
      setAuthStatus('no');
      }, 50);
    });
  }, []);

  // ✅ 아직 판단 중
  if (authStatus === 'loading') {
    return <div>로딩 중...</div>;
  }

  // ✅ 인증 성공
  if (authStatus === 'ok') {
    return (
      <div>
        <h1>홈페이지</h1>
      </div>
    );
  }

    if (authStatus === 'no') {
    return (
      <div>
        <h1>로그인이 필요한 페이지 입니다.</h1>
      <Link href='/login'>로그인 페이지로 이동</Link>
      </div>
    );
  }

  // ✅ 인증 실패한 경우는 리다이렉트가 걸려 있어서 렌더링 안 해도 됨
  return null;
}
'use client';

import { NewsSection } from "@/components/home/NewsSection";
import { StockSection } from "@/components/home/StockSection";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  // * 쿠키의 존재를 상탯값으로 처리 들어가는 항목은 로딩, 오케이, 노 => 기본값은 로딩.
  const [authStatus, setAuthStatus] = useState<'loading' | 'ok' | 'no'>('loading');

  // * 페이지에 진입하면,
  useEffect(() => {
    // * 아래의 url로 포스트 요청을 보냄.
    axios.post('http://localhost:8008/auth/refresh', {}, {
      // * 쿠키를 포함해서 보낸다는 설정.
      withCredentials: true, // 쿠키 전송
    })
    // * 응답이 제대로 오면, 리프레쉬 성공 메시지를 표출하고, 상탯값을 ok로 변경
    .then(res => {
      console.log('refresh 성공', res.data);
      setAuthStatus('ok');
    })
    // * 응답 오류가 발생하면, 리프레쉬 실패 메시지를 표출하고, 상탯값을 no로 변경
    .catch(err => {
      console.log('refresh 실패', err.data);
      setAuthStatus('no');
    });
  }, []);

  // * 상탯값이 변경 되기전에는 로딩중 화면이 뜨게 만듦.
  if (authStatus === 'loading') {
    return <div>로딩 중...</div>;
  }

  // * 상탯값이 ok일 경우 홈페이지 화면이 뜨게 만듦.
  if (authStatus === 'ok') {
  return (
    <div>
      <div>
        <StockSection />
      </div>

      <div>
        <NewsSection />
      </div>
    </div>
  )
  }

  // * 상탯값이 no일 경우 로그인페이지로 이동 버튼이 있는 화면이 뜨게 만듦.
  if (authStatus === 'no') {
    return (
      <div>
        <h1>로그인이 필요한 페이지 입니다.</h1>
      <Link href='/login'>로그인 페이지로 이동</Link>
      </div>
    );
  }

  // * 인증이 안되면 null 값을 리턴해서 아무것도 표시 안되게 만듦.
  return null;
}

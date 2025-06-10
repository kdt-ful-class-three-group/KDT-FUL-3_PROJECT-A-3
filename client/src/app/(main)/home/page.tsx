'use client';

import { NewsSection } from "@/components/home/news/NewsSection";
import { AccountSection } from "@/components/home/account/AccountSection";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageWrapper from "@/components/page/PageWrapper";
import { useIsLoginCheck } from "@/hooks/useIsLoginCheck";

export default function Home() {
  // * 쿠키의 존재를 상탯값으로 처리 들어가는 항목은 로딩, 오케이, 노 => 기본값은 로딩.
  const [authStatus, setAuthStatus] = useState<'loading' | 'ok' | 'no'>('loading');

  // * 페이지에 진입하면,
  useIsLoginCheck({authStatus, setAuthStatus});


  // * 상탯값이 변경 되기전에는 로딩중 화면이 뜨게 만듦.
  if (authStatus === 'loading') {
    return <div>로딩 중...</div>;
  }

  // * 상탯값이 ok일 경우 홈페이지 화면이 뜨게 만듦.
  if (authStatus === 'ok') {
  

    return (
      <>
        <div>
          <AccountSection />
        </div>

        <div>
          <NewsSection />
        </div>
      </>
    )
  }



  // * 인증이 안되면 null 값을 리턴해서 아무것도 표시 안되게 만듦.
  return null;
}

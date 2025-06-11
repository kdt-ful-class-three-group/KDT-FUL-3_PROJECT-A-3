
'use client'

import { Header } from "@/components/common/menu/Header";
import { useIsLoginCheck } from "@/hooks/useIsLoginCheck";
import { useState } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {

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
    <div id="simulation" className="max-w-xl w-full mx-auto px-4 mt-[2%]">
      <Header />
      {children}
    </div>
  );
}
 return null;
}


'use client';

import { useRouter } from "next/navigation";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { SearchAutoComplete } from "@/components/search/SearchAutoComplete";
import { useState } from "react";
import { useIsLoginCheck } from "@/hooks/useIsLoginCheck";

export default function SearchPage() {
  const router = useRouter();

  // router.back으로 뒤로가기 눌렀을때 화면 닫아지는 것으로 수정. 처음 useState 사용하여 컴포넌트로 만드니깐 뒤에 페이지가 뒤로가지는 현상고침

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
    <div className="max-w-md mx-auto px-4">
      <SearchOverlay onClose={()=> router.back()}>
        <SearchAutoComplete />
      </SearchOverlay>
    </div>
  )
  }
  return null;
}
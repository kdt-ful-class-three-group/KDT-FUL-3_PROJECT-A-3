'use client';

import { useRouter } from "next/navigation";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { SearchAutoComplete } from "@/components/search/SearchAutoComplete";

export default function SearchPage() {
  const router = useRouter();

  // router.back으로 뒤로가기 눌렀을때 화면 닫아지는 것으로 수정. 처음 useState 사용하여 컴포넌트로 만드니깐 뒤에 페이지가 뒤로가지는 현상고침
  return (
    <div className="max-w-md mx-auto px-4">
      <SearchOverlay onClose={()=> router.back()}>
        <SearchAutoComplete />
      </SearchOverlay>
    </div>
  )
}
'use client'

import { Button } from "@/components/common/Button"
import { useRouter } from "next/navigation"

export default function StocksLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  

  //! 가이드라인 버튼 이벤트 추가 해야함.

  return (
    <>
      <Button
        name="뒤로가기"
        onClick={() => router.back()}
      />
      <Button
        name="가이드라인"
        onClick={() => { }}
      />
      <div>
        {children}
      </div>
    </>
  )
}
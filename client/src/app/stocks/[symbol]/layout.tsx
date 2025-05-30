'use client'

import { Button } from "@/components/common/Button"
import { useRouter } from "next/navigation"

export default function StocksLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
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
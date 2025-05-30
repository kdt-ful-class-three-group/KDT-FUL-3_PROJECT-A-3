'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/common/Button"

export default function TradeLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <Button
        name="뒤로가기"
        onClick={() => router.back()}
      />
      <div>
        {children}
      </div>
    </>
  )
}
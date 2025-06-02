'use client'
import TradeList from "@/components/history/TradeList"
import { Button } from "@/components/common/Button"
import { useRouter } from "next/navigation"

export default function historyPage(){
  const router= useRouter()

  return(
    <div>
      <h1>거래 내역</h1>
      <Button name='뒤로가기' onClick={()=>router.back()}/>
      <TradeList />
    </div>
  )
}
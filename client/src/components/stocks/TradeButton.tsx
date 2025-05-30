'use client'
import { useRouter } from "next/navigation"
import { Button } from "../common/Button"

export function TradeButton() {
  const router = useRouter()

  const trade = () => {
    console.log('판매/구매 페이지이동')
    router.push('/trade')
  }

  return (
    <div>
      <Button
        name="판매"
        onClick={trade}
      />
      <Button
        name="구매"
        onClick={trade}
      />
    </div>
  )
}
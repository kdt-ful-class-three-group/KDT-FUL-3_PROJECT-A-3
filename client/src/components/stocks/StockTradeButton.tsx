'use client'
import { useRouter } from "next/navigation"
import { Button } from "../common/Button"

export function StockTradeButton() {
  const router = useRouter()

  const handleTrade = (type: 'sell' | 'buy') => {
    router.push(`/trade?type=${type}`)
  }
  return (
    <div>
      <Button
        name="판매"
        onClick={() => handleTrade('sell')}
      />
      <Button
        name="구매"
        onClick={() => handleTrade('buy')}
      />
    </div>
  )
}
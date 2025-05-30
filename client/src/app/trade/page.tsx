'use client'

import { useSearchParams } from "next/navigation"
import { TradeContent } from "@/components/trade/TradeContent"

export default function TradePage() {
  const searchParams = useSearchParams()
  const tradeType = searchParams.get('type')

  return (
    <div>
      {(tradeType === 'buy' || tradeType === 'sell') && (
        <TradeContent mode={tradeType} />
      )}
    </div>
  )
}
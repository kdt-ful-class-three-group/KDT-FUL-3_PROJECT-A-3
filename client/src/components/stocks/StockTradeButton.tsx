'use client'

import { useDispatch } from "react-redux"
import { setTrade } from "@/store/slices/tradeSlice"
import { useRouter } from "next/navigation"
import { Button } from "../common/Button"

interface Props {
  symbol: string
  price: number
}

export function StockTradeButton({ symbol, price }: Props) {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleTrade = (type: 'sell' | 'buy') => {
    dispatch(setTrade({ symbol, price, type }))
    router.push(`/stocks/${symbol}/trade?type=${type}`)
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
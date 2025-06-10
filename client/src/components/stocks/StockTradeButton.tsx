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
    <div className="flex w-full justify-center items-center ">
      <Button className=" w-1/2 h-12 rounded-xl bg-[#228be6] text-white hover:bg-[#1c7ed6]/90 mx-3"
        name="판매하기"
        onClick={() => handleTrade('sell')}
      />
      <Button className="w-1/2 h-12 rounded-xl bg-[#fa5252] text-white hover:bg-[#fa5252]/90 mx-3"
        name="구매하기"
        onClick={() => handleTrade('buy')}
      />
    </div>
  )
}
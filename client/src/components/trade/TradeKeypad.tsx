'use client'

import { useState } from "react"
import { Input } from "../common/Input"
import { Button } from "../common/Button"
import { TradeContentProps } from "@/types/\btrade"


export function TradeKeypad({ mode }: TradeContentProps) {
  const [amount, setAmount] = useState("");

  const handleAction = () => {
    if (mode === 'sell') {
      // 판매 처리
    } else {
      // 구매 처리
    }
  };


  return (
    <div>
      <div>
        <Input
          label="수량"
          placeholder="몇 주 구매할까요?"
          value={amount}
          readOnly
        />
      </div>

      <div>

      </div>

      <div>
        <Button
          name={mode === 'sell' ? "판매하기" : "구매하기"}
          onClick={handleAction}
        />
      </div>
    </div>
  )
}
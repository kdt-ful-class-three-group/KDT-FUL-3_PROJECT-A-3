'use client'
import TradeList from "@/components/history/TradeList"
import { Button } from "@/components/common/Button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"

export default function historyPage() {
  const router = useRouter()

  // 데이터
  const [tradeData, setTradeData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post('http://localhost:8008/userportfolio/history', {}, {
          withCredentials: true,
        })

        setTradeData(res.data)
        console.log(res.data)

      }
      catch (err) {
        console.log('거래 내역 가져오기 실패', err)
      }

    }

    // 실행
    fetchData()

  }, [])

  return (
    <div className="max-w-[550px] mx-auto px-4 mt-6">
      <div className="relative mb-6">
        <h1 className="text-2xl font-semibold text-center">거래 내역</h1>
        <div className="absolute left-0 top-4">
          <Button icon="back" onClick={() => router.back()} />
        </div>
      </div>
      <TradeList trades={tradeData} />
    </div>
  )
}
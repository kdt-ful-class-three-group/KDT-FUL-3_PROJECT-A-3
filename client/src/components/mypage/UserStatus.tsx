'use client'
// 주식관련
import { useDispatch, useSelector } from "react-redux"
import { getUserStatus } from "@/store/slices/userStatusSlice"
import { useEffect, useState } from "react"
import type { RootState, AppDispatch } from "@/store"
import { Button } from "../common/Button"
import { useRouter } from "next/navigation"
import { Account } from "@/types/account"
import Link from "next/link"

export default function UserStatus(){

  const [account, setAccount] = useState<Account | null>(null)
  
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  //상태값 가져오기
  const {tradeCount, tradeVolume, topTrades, loading, error} = useSelector((state:RootState)=> state.userStatus)

  // 유저
  const nick = useSelector((state:RootState)=> state.userProfile.nick)
  // 자산 - accountslice에 asset
  const asset = useSelector((state:RootState)=> state.account.asset)
  // ! 성공률 ? - 표시할 거 라면 따로 값 필요함


  useEffect(()=>{
    // 유저 데이터를 가져왔을때
    if(nick){
      
      dispatch(getUserStatus(nick))
    }
  },[dispatch,nick])

  return(
    <div className=" max-w-md mx-auto w-full">
      {/* 로딩, 에러 */}
      {loading && <p>로딩 중 ...</p>}
      {error && <p>{error}</p>}
      {/* 투자횟수, 성공률, 보유 자산 */}
      <div className="flex justify-between gap-5 w-full">
        <div className="w-1/2 p-1 rounded shadow-md">
          <p className="p-1 text-sm">투자 횟수</p>
          <p className="text-center py-5 text-3xl font-bold">{tradeCount}</p>
        </div>
        <div className="w-1/2 p-1 rounded shadow-md">
          <p className="p-1 text-sm">보유 자산</p>
          <p className="text-center py-5 text-3xl font-bold">{asset} </p>
        </div>
      </div>
      {/* 많이 거래한 내역 3개 */}
      <div className="shadow-md">
        <div className="flex justify-between items-center">
          <h3 className="p-1 text-sm">거래 TOP3</h3>
          <Link href='/portfolio' className=" text-2xl"> {`>`}</Link>
        </div>
        <div className="flex justify-around">
          {topTrades.map(item=>(
            <p key={item.id} className="text-2xl font-bold py-5">{item.symbol}</p>
          ))}

        </div>
      </div>
    </div>
  )
}